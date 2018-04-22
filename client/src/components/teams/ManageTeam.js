import React, { Component, Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import { Alert, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'

import { Loading } from '../utils'

class ManageTeam extends Component {

    render() {
        const { data: { loading, team, self } } = this.props
        const { location: { host, protocol } } = window
        return (
            <Container>
                <h1>
                    Manage Team
                    {team && (
                        <Fragment>
                            : <small className='text-muted'>{team.name}</small>
                        </Fragment>
                    )}
                </h1>
                {loading ? <Loading /> : (
                    <Fragment>
                        <Alert color="info">
                            <h4>Invite Link</h4>
                            <p>
                                Copy the link below and share with your teammates:
                            </p>
                            <pre>
                                <code>
                                    {`${protocol}//${host}/accept-invite/${team.id}`}
                                </code>
                            </pre>
                        </Alert>
                        <Row>
                            <Col md={6} style={{ marginTop: '2rem' }}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            Players
                                        </CardTitle>
                                        {team.players.map(player => (
                                            <div key={`player-${player.id}`}>
                                                {player.username}
                                            </div>
                                        ))}
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6} style={{ marginTop: '2rem' }}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            Team Info
                                        </CardTitle>
                                        <div>Captain: {team.captain.username}</div>
                                        <div>Created: {moment(team.created).format('L')}</div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} style={{ marginTop: '2rem' }}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            Actions
                                        </CardTitle>
                                        {self.username}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Fragment>
                )}
            </Container>
        )
    }
}

const query = gql`
    query getTeam($id: UUID!) {
        team(id: $id) {
            id
            name
            created
            captain {
                id
                username
            }
            players {
                id
                username
            }
        }
        self {
            username
        }
    }
`
const mutationChangeCaptain = gql`
    mutation ($teamId: UUID!, $playerId: UUID!) {
        changeCaptain(teamId: $teamId, playerId: $playerId) {
            ok
            error
        }
    }
`


ManageTeam = compose(
    graphql(query, {
        options: ({ match: { params: { id }}}) => ({ variables: { id }})
    }),
    graphql(mutationChangeCaptain),
)(ManageTeam)


export default ManageTeam
