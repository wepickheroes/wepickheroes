import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, CardTitle, Col, Container, Row, CardImg } from 'reactstrap'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSteam } from '@fortawesome/fontawesome-free-brands'

import logoLarge from '../img/logos/WPHlogo5sgcolors.svg'
import keyboardImg from '../img/gaming_stock.jpg'
import bracket01 from '../img/June_Bracket_01.png'
import theDire from '../img/the_dire.jpg'
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
    max-height: 250px;
    margin-bottom: 2rem;
`
const MarketingList = styled.ol`
    margin-left: 2rem;
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
                        To get started, sign in with your Steam account, create a team, and invite your teammates
                        to join!
                    </Description>
                    <div>
                        {!loading && !isAuthenticated && (
                            <Button color="success" size="lg"
                                    href={createUrl('/login/steam/')}>
                                <FontAwesomeIcon icon={faSteam} />&nbsp;Sign Up
                            </Button>
                        )}
                    </div>
                </Intro>
            </Container>
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <span id="how-it-works" className="display-4">
                                Tournament Bracket
                            </span>
                        </CardTitle>
                                <CardImg style={{ maxWidth: '90%', marginLeft: '5%', marginRight: '5%', marginBottom: '1.875rem' }} className='img-fluid' src={bracket01}/>
                    </CardBody>
                </Card>
            </Container>
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <span id="how-it-works" className="display-4">
                                New Tournament League!
                            </span>
                        </CardTitle>
                        <Row>
                            <Col md="4" xs="12">
                                <MarketingImage className='img-fluid' src={keyboardImg}/>
                            </Col>
                            <Col md="8" xs="12" className="d-flex align-items-center">
                                <div>
                                    <MarketingDescription>
                                        We will be hosting a weekend tournament between <strong>June 2nd</strong> and <strong>June 17th</strong>,
                                        with open qualifiers on <strong>May 26th</strong>.
                                        We will have 8 teams competing.
                                    </MarketingDescription>
                                    <MarketingList>
                                        <li><strong>$100</strong> for First Place</li>
                                        <li><strong>$50</strong> for Second Place</li>
                                        <li><strong>$25</strong> for Third Place</li>
                                    </MarketingList>
                                    <MarketingDescription>
                                        For more information on the format, rules, and FAQ,
                                        please check out the Resources tab.
                                    </MarketingDescription>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
            <Container>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <span id="how-it-works" className="display-4">
                                How it works
                            </span>
                        </CardTitle>
                        <Row>
                            <Col sm="4">
                                  <MarketingImage className='img-fluid' src={theDire} />
                              </Col>
                              <Col sm="8">
                                  <MarketingList>
                                      <li>Sign up to the site</li>
                                      <li>Create a team (via <em>"My Teams"</em> tab)</li>
                                      <li>Send the invite code to your players</li>
                                      <li>register your team to the open league you wish to participate in (via <em>"Leagues"</em> tab)</li>
                                      <li>Join us on Discord for updates and more information!</li>
                                  </MarketingList>
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
