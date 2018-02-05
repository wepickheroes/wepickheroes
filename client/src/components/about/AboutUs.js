import React from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Row } from 'reactstrap'
import theDire from '../../img/the_dire.jpg'
import { createUrl } from '../../api/utils'

export const Intro = styled.div`
    margin: 2rem 0;
    text-align: center;
`
const Description = styled.p`
    max-width: 880px;
    margin: 0 auto 30px auto;
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

const AboutUs = props => (
    <Container fluid>
        <Container>
            <Intro>
                <h1 className="display-4">About Us</h1>
                <Description className="lead">
                    <p>PUSH League is a Dota 2 amateur league focused on players wanting a
                    competitive environment where they can grow and advance to
                    higher tiers for greater challenges and rewards.</p>
                    <p>We previously flew under the banner We Pick Heroes back in April of 2017 and ran a small amateur tournament with a $1k prize pool.
                    Our experience was eye-opening and made us want to continue working within amateur Dota,
                    but running tournament after tournament was not self-sustaining and we quickly realized we had to develop another strategy. </p>
                    <p>There are many great leagues currently active in the amateur scene and we want to add to that.
                    Our league focuses on short 6-week seasons where players are divided into tiers based on team player medal averages.
                    At the end of a season the highest-ranking teams have a chance to get promoted into the tier above theirs for a chance at greater prizes the next season.
                    The highest tier gets to participate in a single-elimination tournament for prizes! </p>
                    <p>New teams are more than welcome to join when registrations for the next season open. 
                    All points reset at the beginning of the next season, while promoted teams will start in their new tier.</p>
                    <p>
                    Thank you to everyone that participates in our league and supports us. We would not be able to do this without you!
                    </p>
                </Description>

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

export default AboutUs
