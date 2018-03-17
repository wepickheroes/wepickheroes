import React from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'

import theDire from '../img/keyboard.jpg'
import { createUrl } from '../api/utils'
import {
    Divider,
    MarketingImage,
} from './utils'

export const Intro = styled.div`
    margin: 2rem 0;
    text-align: center;
`
const Description = styled.p`
    max-width: 400px;
    margin: 0 auto 30px auto;
`

const MarketingDescription = styled.p`
    margin-left: 2rem;
    color: #062736;
`

const Homepage = props => (
    <Container fluid>
        <Container>
            <Intro>
                <h1 className="display-4">PUSH League</h1>
                <h2>Competitive Amateur Dota 2 League</h2>
                <Description className="lead">
                  Registration is free and easy!
                  To get started, sign in with your Steam account, create a team page, and invite your teammates to join!
                </Description>
                <div>
                    <Button color="success" size="lg"
                            href={createUrl('/login/steam/?next=/social-redirect')}>
                        <i className="fab fa-steam" />&nbsp;Sign Up
                    </Button>
                </div>
            </Intro>
        </Container>
        <Divider />
        <Container>
            <Card>
                <CardBody>
                    <CardTitle>
                        <span id="how-it-works" className="display-4">
                            Season 0 coming soon!
                        </span>
                    </CardTitle>
                    <Row>
                        <Col sm="4" >
                            <MarketingImage className='img-fluid' src={theDire} />
                        </Col>
                        <Col sm="8" className="d-flex align-items-center">
                            <div >
                                <MarketingDescription>
                                    With the beta launch of our site we will soon be commencing our preliminary Season 0 of the We Pick Heroes League!
                                    This season will consist of 4 tiers with 6 qualifying teams in each. The season will run for 4 weeks.
                                    We’re starting small so we can identify any potential issues before we advance out of beta and into full launch!
                                </MarketingDescription>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
        <Divider />
    </Container>
)

export default Homepage
