import React, { Component, Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from 'reactstrap'

import { Loading } from '../utils'

class ManageTeam extends Component {

    handleChangeCaptainClick = (teamId, newCaptainId) => () => {
        console.log(teamId, newCaptainId)
        const { mutate } = this.props
        mutate({
            variables: {
                teamId, newCaptainId,
            },
        }).then(({ data: { changeCaptain: { ok, error } } }) => {
            this.setState({
                ok, error, submitted: true,
            })
        }).catch(error => {
            console.error('error', error)
            this.setState({
                ok: false,
                error,
                submitted: true,
            })
        })
    }

    render() {

        const baseButtonProps = {
            size: 'lg',
            color: 'success',
            children: 'Change Captain',
        }

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
                                        <UncontrolledButtonDropdown>
                                        <DropdownToggle {...baseButtonProps} caret />
                                        <DropdownMenu>
                                            <DropdownItem header>Select a player :</DropdownItem>
                                            {team.players.map(player => {
                                                return (
                                                    <DropdownItem
                                                        key={`change-captain-${player.id}`}
                                                        onClick={this.handleChangeCaptainClick(team.id, player.id)}
                                                    >
                                    {player.username}
                                </DropdownItem>
                                                )

                                            })}

                                        </DropdownMenu>

                                        </UncontrolledButtonDropdown>

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
const changeCaptain = gql`
mutation ($teamId: UUID!, $newCaptainId: Int!) {
    changeCaptain(newCaptainId: $newCaptainId, teamId: $teamId) {
        ok
        error
    }
}`



ManageTeam = compose(
    graphql(query, {
        options: ({ match: { params: { id }}}) => ({ variables: { id }})
    }),
    graphql(changeCaptain),
)(ManageTeam)


export default ManageTeam
