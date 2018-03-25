import React, { Component, Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { LinkContainer } from 'react-router-bootstrap'
import {
    Alert,
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    UncontrolledButtonDropdown,
} from 'reactstrap'

import { createUrl } from '../../api/utils'


class RegisterButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            ok: false,
            submitted: false,
            noTeamsModal: false,
        }
    }

    toggleNoTeamsModal = () => this.setState({ noTeamsModal: !this.state.noTeamsModal })

    renderNoTeamsModal = () => {
        const { noTeamsModal } = this.state
        return (
            <Modal isOpen={noTeamsModal} toggle={this.toggleNoTeamsModal}>
                <ModalHeader toggle={this.toggleNoTeamsModal}>Register a Team</ModalHeader>
                <ModalBody>
                    You are not the captain of any teams. Only team captains can register for leagues.
                </ModalBody>
                <ModalBody>
                    If you are on a team, ask your captain to register. If you don't have a team, click below to
                    create one.
                </ModalBody>
                <ModalFooter>
                    <LinkContainer to='/teams/create'>
                        <Button color='success'>Create a Team</Button>
                    </LinkContainer>
                    <Button color='secondary' onClick={this.toggleNoTeamsModal}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

    handleRegisterTeamClick = teamId => () => {
        console.log('handleRegisterTeam', teamId)
        const { leagueId, mutate } = this.props
        mutate({
            variables: {
                teamId, leagueId,
            },
        }).then(({ data, data: { createLeagueRegistration: { ok, error, leagueRegistration } } }) => {
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
        const {
            data: {
                loading,
                isAuthenticated,
                self,
            },
            leagueId,
        } = this.props
        const { error, ok, submitted } = this.state
        const baseButtonProps = {
            size: 'lg',
            color: 'success',
            children: 'Register a Team',
        }

        const placeholder = <Button {...baseButtonProps}
                                    style={{visibility: 'hidden'}} />

        if (loading) return placeholder
        if (!isAuthenticated) {
            return (
                <Button {...baseButtonProps}
                        href={createUrl('/login/steam/?next=/social-redirect/signup-complete')}>
                    <i className="fab fa-steam"/>&nbsp;Sign In to Register
                </Button>
            )
        }
        const teamsCaptainOf = self ? self.teamsCaptainOf : []
        if (teamsCaptainOf.length === 0) {
            return (
                <Fragment>
                    {this.renderNoTeamsModal()}
                    <Button {...baseButtonProps}
                            onClick={this.toggleNoTeamsModal} />
                </Fragment>
            )
        }

        return (
            <Fragment>
                <UncontrolledButtonDropdown>
                    <DropdownToggle {...baseButtonProps} caret />
                    <DropdownMenu>
                        <DropdownItem header>Select a team to register:</DropdownItem>
                        {teamsCaptainOf.map(team => {
                            const teamAlreadyRegistered = Boolean(
                                team.leagueregistrationSet.find(leagueRegistration => (
                                    leagueRegistration.league.id === leagueId
                                ))
                            )
                            const teamHasEnoughPlayers = team.players.length >= 5
                            let errorMessage = teamAlreadyRegistered ? ' (already registered)' : null
                            errorMessage = !errorMessage && !teamHasEnoughPlayers
                                ? ' (not enough players)'
                                : errorMessage
                            return (
                                <DropdownItem key={`register-team-${team.id}`}
                                              disabled={teamAlreadyRegistered || !teamHasEnoughPlayers}
                                              onClick={this.handleRegisterTeamClick(team.id)}>
                                    {team.name}{errorMessage}
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
                {submitted && (
                    <Alert color={ok ? 'success' : 'danger'} style={{ marginTop: '1rem' }}>
                        {ok ? 'Your team has been registered.' : error}
                    </Alert>
                )}
            </Fragment>
        )
    }

}

const query = gql`
query {
    myTeams {
        id
        captain {
            id
        }
    }
    self {
        id
        teamsCaptainOf {
            id
            name
            leagueregistrationSet {
                id
                league {
                    id
                }
            }
            players {
                id
            }
        }
    }
    isAuthenticated
}`
const mutation = gql`
mutation ($teamId: UUID!, $leagueId: UUID!) {
    createLeagueRegistration(leagueId: $leagueId, teamId: $teamId) {
        ok
        error
        leagueRegistration {
            id
        }
    }
}`
const mutationUpdate = gql`
query {
    self {
        id
        teamsCaptainOf {
            id
            leagueregistrationSet {
                id
                league {
                    id
                }
            }
        }
    }
}`

RegisterButton = compose(
    graphql(query),
    graphql(mutation, {
        options: {
            refetchQueries: [{ query: mutationUpdate }],
        }
    }),
)(RegisterButton)

export default RegisterButton
