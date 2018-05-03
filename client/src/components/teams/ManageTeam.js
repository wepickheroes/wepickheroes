import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import { Alert, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'

import { Loading } from '../utils'

import { isRole } from './utils'

class ManageTeam extends Component {

    render() {
        const { data: { loading, team, allTeammembers } } = this.props
        const { location: { host, protocol } } = window

        const allTeammembersSorted = loading ? [] : (
                allTeammembers.filter(isRole('A_1')).concat(
                    allTeammembers.filter(isRole('A_2'))
                )
            )

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
                                            {allTeammembersSorted.map(t => {
                                                if (t.team.id == team.id) {
                                                    return (
                                                        <div>
                                                            {`${t.player.username} ${t.role === 'A_2' ? ' (Sub)' : ''}`}
                                                        </div>
                                                    )
                                                }
                                            })}
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
        allTeammembers {
            role
            team {
                id
            }
            player {
                username
            }
        }
    }
`

ManageTeam = graphql(query, {
    options: ({ match: { params: { id }}}) => ({ variables: { id }})
})(ManageTeam)

export default ManageTeam
