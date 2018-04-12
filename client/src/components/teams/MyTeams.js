import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Card, CardBody, CardTitle, CardText, Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

import { Loading } from '../utils'

class MyTeams extends Component {

    render() {
        const { data: { loading, myTeams } } = this.props
        return (
            <Container>
                <h1>My Teams</h1>
                {loading ? <Loading /> : (
                    <div>
                        <Row>
                            {myTeams.map((team, i) => (
                                <Col key={`team-${team.id}`} lg={myTeams.length >= 2 ? 4 : 6} md={6} xs={12} sm={12}>
                                    <Card style={{ marginTop: '2rem' }}>
                                        <CardBody>
                                            <CardTitle>
                                                {team.name}
                                            </CardTitle>
                                            <CardText>
                                                <Link to={`/my-teams/${team.id}`}>
                                                    <i className='fas fa-cog' />&nbsp;Manage
                                                </Link>
                                            </CardText>
                                            <CardText>
                                                {team.players.map(p => p.username).join(', ')}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <div className='text-center' style={{ marginTop: '1rem' }}>
                            <LinkContainer to='/teams/create'>
                                <Button color="primary">
                                    <i className='fas fa-plus' />&nbsp;
                                    Create a Team
                                </Button>
                            </LinkContainer>
                        </div>
                    </div>
                )}
            </Container>
        )
    }
}

const query = gql`
    query {
        myTeams {
            id
            name
            captain {
                id
                username
            }
            players {
                id
                username
            }
        }
    }
`

MyTeams = graphql(query)(MyTeams)

export default MyTeams
