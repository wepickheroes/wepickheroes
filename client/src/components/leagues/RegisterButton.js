import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { LinkContainer } from 'react-router-bootstrap'
import {
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

RegisterButton = graphql(query)(RegisterButton)

export default RegisterButton
