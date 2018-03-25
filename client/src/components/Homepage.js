import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import logoLarge from '../img/logos/WPHlogo5sgcolors.svg'
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

const MainLogo = styled.img`
    width: auto;
    max-height: 300px;
    margin-bottom: 2rem;
`

const Homepage = props => {
    const { data: {loading, isAuthenticated = false } } = props
    return (
        <Fragment>
            <Container>
                <Intro>
                    <MainLogo src={logoLarge} alt="We Pick Heroes" />
                    <h2>Competitive Amateur Dota 2 League</h2>
                    <Description className="lead">
                        Registration is free and easy!
                        To get started, sign in with your Steam account, create a team page, and invite your teammates
                        to join!
                    </Description>
                    <div>
                        {!loading && !isAuthenticated && (
                            <Button color="success" size="lg"
                                    href={createUrl('/login/steam/?next=/social-redirect/signup-complete')}>
                                <i className="fab fa-steam"/>&nbsp;Sign Up
                            </Button>
                        )}
                    </div>
                </Intro>
            </Container>
            <Divider/>
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <span id="how-it-works" className="display-4">
                                Season 0 coming soon!
                            </span>
                        </CardTitle>
                        <Row>
                            <Col md="4" xs="12">
                                <MarketingImage className='img-fluid' src={theDire}/>
                            </Col>
                            <Col md="8" xs="12" className="d-flex align-items-center">
                                <div>
                                    <MarketingDescription>
                                        With the beta launch of our site we will soon be commencing our preliminary
                                        Season 0 of the We Pick Heroes League!
                                        This season will consist of 4 tiers with 6 qualifying teams in each. The season
                                        will run for 4 weeks.
                                        We’re starting small so we can identify any potential issues before we advance
                                        out of beta and into full launch!
                                    </MarketingDescription>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    )
}

const query = gql`query { isAuthenticated }`
export default graphql(query)(Homepage)
