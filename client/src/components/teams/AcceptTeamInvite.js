import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Container } from 'reactstrap'

import { ContentContainer, Loading } from '../utils'
import {createUrl} from "../../api/utils";

class AcceptTeamInvite extends Component {

    render() {
        const { data: { loading, team } } = this.props
        return (
            <ContentContainer>
                <Container>
                    <h1>Accept Invite</h1>
                    {loading ? <Loading /> : (
                        <Fragment>
                            <p>
                                You've been invited to join <strong>{team.name}</strong> by{' '}
                                <strong>{team.captain.username}</strong>.
                            </p>
                            <p>Click below to sign up and accept this team invite:</p>
                            <div>
                                <Button color="success" size="lg"
                                        href={createUrl(`/login/steam/?next=/accept-invite/finish/${team.id}`)}>
                                    <i className="fab fa-steam"/>&nbsp;Accept Invite
                                </Button>
                            </div>
                        </Fragment>
                    )}
                </Container>
            </ContentContainer>
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
    }
`

AcceptTeamInvite = graphql(query, {
    options: ({ match: { params: { id }}}) => ({ variables: { id }})
})(AcceptTeamInvite)

export default AcceptTeamInvite
