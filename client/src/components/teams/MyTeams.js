import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Card, CardBody, CardTitle, CardText, Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog, faPlus } from '@fortawesome/fontawesome-free-solid'

import { Loading } from '../utils'


class MyTeams extends Component {

    render() {
        const { data: { loading, myTeams, allTeammembers } } = this.props
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
                                                    <FontAwesomeIcon icon={faCog} />&nbsp;Manage
                                                </Link>
                                            </CardText>
                                            <CardText>
                                                {allTeammembers.map(t =>
                                                    {
                                                        if (t.team.name == team.name && t.role == 'A_1') {
                                                            return t.player.username.concat(' ', '(', 'Player',')', '\n')
                                                        }

                                                        if (t.team.name == team.name && t.role == 'A_2') {
                                                            return t.player.username.concat(' ', '(', 'Sub',')', '\n')
                                                        }
                                                    }
                                                )}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <div className='text-center' style={{ marginTop: '1rem' }}>
                            <LinkContainer to='/teams/create'>
                                <Button color="primary">
                                    <FontAwesomeIcon icon={faPlus} />&nbsp;
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
        allTeammembers {
            role
            team {
                name
            }
            player {
                username
            }
        }
    }
`


MyTeams = graphql(query)(MyTeams)

export default MyTeams
