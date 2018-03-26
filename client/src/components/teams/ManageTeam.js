import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Card, CardBody, CardTitle, CardText, Container } from 'reactstrap'

import { Loading } from '../utils'

class ManageTeam extends Component {

    render() {
        const { data: { loading, team } } = this.props
        const { location: { host, protocol } } = window
        return (
            <Container>
                <h1>Manage Team</h1>
                {loading ? <Loading /> : (
                    <Fragment>
                        <h2>{team.name}</h2>
                        <Card>
                            <CardBody>
                                <CardTitle>Invite Link</CardTitle>
                                <CardText>
                                    Copy the link below and share with your teammates:
                                </CardText>
                                <pre>
                                    <code>
                                        {`${protocol}//${host}/accept-invite/${team.id}`}
                                    </code>
                                </pre>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    Players
                                </CardTitle>
                            </CardBody>
                        </Card>
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
        }
    }
`

ManageTeam = graphql(query, {
    options: ({ match: { params: { id }}}) => ({ variables: { id }})
})(ManageTeam)

export default ManageTeam
