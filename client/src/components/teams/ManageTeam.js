import React, { Component, Fragment } from 'react'
import { compose, graphql, Mutation, Query } from 'react-apollo'
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


class ManageTeam extends Component {

    handleChangeCaptainClick = (teamId, newCaptainId, changeCaptain) => () => {
        const { match: { params: { id } } } = this.props
        changeCaptain({
            variables: {
                teamId, newCaptainId, id,
            },
        })
    }

    renderChangeCaptainErrors = ({ ok, error }) => {
        if (!ok) {
            return <Alert color='danger'>{error}</Alert>
        }
    }

    render() {
        const baseButtonProps = {
            size: 'lg',
            color: 'success',
            children: 'Change Captain',
        }

        const { data: { loading, team, self }, match: { params: { id }} } = this.props
        const { location: { host, protocol } } = window

        const v = true;

        return (
            <Container>
                <Mutation mutation={changeCaptain}
                          refetchQueries={res => {
                              return [{ query, variables: { id } }]
                          }}>
                    {(changeCaptain, { data } ) => (
                        <Fragment>
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
                                                        {self.username == team.captain.username ?
                                                            //
                                                            <div>
                                                            <div>{data && data.changeCaptain && this.renderChangeCaptainErrors(data.changeCaptain)}</div>
                                                            <UncontrolledButtonDropdown size="sm">

                                                                <DropdownToggle {...baseButtonProps} caret />
                                                                <DropdownMenu>
                                                                    <DropdownItem header>Select a player :</DropdownItem>
                                                                    {team.players.map(player => {
                                                                        return (
                                                                            <DropdownItem
                                                                                key={`change-captain-${player.id}`}
                                                                                onClick={this.handleChangeCaptainClick(
                                                                                    team.id, player.id, changeCaptain
                                                                                )}>
                                                                                {player.username}
                                                                            </DropdownItem>
                                                                        )
                                                                    })}
                                                                </DropdownMenu>
                                                            </UncontrolledButtonDropdown>
                                                            </div>
                                                            : <div></div>
                                                        }


                                                    <div>Created: {moment(team.created).format('L')}</div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Fragment>
                            )}
                        </Fragment>
                    )}
                </Mutation>
            </Container>
        )
    }
}



ManageTeam = compose(
    graphql(query, {
        options: ({ match: { params: { id }}}) => ({ variables: { id }})
    }),
)(ManageTeam)


export default ManageTeam
