import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Alert, Button, Container } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSteam } from '@fortawesome/fontawesome-free-brands'

import { Loading } from '../utils'
import { createUrl } from "../../api/utils";

class AcceptTeamInvite extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            ok: false,
            submitted: false,
        }
    }

    componentDidMount() {
        const { match: { params: { id } } } = this.props
        localStorage.setItem('acceptInvite', id)
    }

    handleAcceptInviteClick = e => {
        console.log('handleAcceptInviteClick', e)
        const { mutate } = this.props
        mutate().then(({ data, data: { createTeamMember: { ok, error, team } } }) => {
            console.log('data', data)
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
        const { data: { loading, team, isAuthenticated }, match: { url } } = this.props
        const { error, ok, submitted } = this.state
        return (
            <Container>
                <h1>Accept Invite</h1>
                {loading ? <Loading /> : (
                    team ? (
                        <Fragment>
                            <p>
                                You've been invited to join <strong>{team.name}</strong> by{' '}
                                <strong>{team.captain && team.captain.username}</strong>.
                            </p>
                            <p>
                                Click below to {!isAuthenticated && 'sign up and '}accept this team invite:
                            </p>
                            {!(submitted && ok) && (
                                <div>
                                    <Button color="success" size="lg"
                                            onClick={isAuthenticated ? this.handleAcceptInviteClick : null}
                                            href={!isAuthenticated ? createUrl(`/login/steam/?next=/social-redirect${url}`) : null}>
                                        {!isAuthenticated && (
                                            <Fragment>
                                                <FontAwesomeIcon icon={faSteam} />&nbsp;
                                            </Fragment>
                                        )}
                                        Accept Invite
                                    </Button>
                                </div>
                            )}
                            {submitted && (
                                <Alert color={ok ? 'success' : 'danger'} style={{ marginTop: '1rem' }}>
                                    {ok ? `You are now a member of ${team.name}.` : error}
                                </Alert>
                            )}
                        </Fragment>
                    ) : (
                        <div>
                            <h2>404: Not Found</h2>
                        </div>
                    )
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
        captain {
            username
        }
    }
    isAuthenticated
}`

const acceptInviteMutation = gql`
mutation ($teamId: UUID!) {
    createTeamMember(teamId: $teamId) {
        ok
        error
        team {
            id
        }
    }
}`

AcceptTeamInvite = compose(
    graphql(query, {
        options: ({ match: { params: { id }}}) => ({ variables: { id }})
    }),
    graphql(acceptInviteMutation, {
        options: ({ match: { params: { id }}}) => ({ variables: { teamId: id }})
    })
)(AcceptTeamInvite)

export default AcceptTeamInvite
