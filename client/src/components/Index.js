import React from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Jumbotron, Row } from 'reactstrap'
import theDire from '../img/the_dire.jpg'

const Intro = styled(Jumbotron)`
    margin: 2rem 0;
    text-align: center;
`
const Description = styled.p`
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
`
const Divider = styled.hr`
    margin: 5rem 0;
`
const MarketingImage = styled.img`
    max-width: 400px;
`
const MarketingList = styled.ol`
    margin-left: 2rem;
`

const steamSignInRedirectDomain = process.env.NODE_ENV === 'production' ?
    'https://wepickheroes.com:8000' :
    'http://localhost:8000'

const Index = props => (
    <Container fluid>
        <Container>
            <Intro>
                <h1 className="display-3">We Pick Heroes</h1>
                <h2>Amateur Dota 2 League</h2>
                <Description className="lead">
                    Become a part of the first amateur Dota 2 competitive league. All skill levels are
                    accepted. Registration is free and easy.
                </Description>
                <div>
                    <Button color="info" size="lg" href="#how-it-works">
                        Learn More
                    </Button>{' '}
                    <Button color="success" size="lg"
                            href={`${steamSignInRedirectDomain}/login/steam/?next=/social-redirect`}>
                        <i className="fa fa-steam" />&nbsp;Sign Up
                    </Button>
                </div>
            </Intro>
        </Container>
        <Divider />
        <Container>
            <h2 id="how-it-works" className="display-4">
                How it works
            </h2>
            <Row>
                <Col sm="4">
                    <MarketingImage src={theDire} />
                </Col>
                <Col sm="8">
                    <MarketingList>
                        <li>Assemble a team</li>
                        <li>Sign up for a league</li>
                        <li>Get matched against teams with a similar skill level</li>
                        <li>Play a round-robin tournament match once per week</li>
                        <li>Compete to move up to the next bracket, or for cash prizes!</li>
                    </MarketingList>
                </Col>
            </Row>
        </Container>
        <Divider />
    </Container>
)

export default Index
