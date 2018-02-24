import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import { Button, Col, Container, Row } from 'reactstrap'

import { ContentContainer} from '../utils'

const SignupComplete = props => (
    <ContentContainer>
        <Container>
            <h1 className='text-center'>Signup Complete!</h1>
            <Row>
                <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                    <h2 className='text-center'>
                        Would you like to register a team?
                    </h2>
                    <div className='text-center'>
                        <LinkContainer to='/'>
                            <Button color="secondary" size="lg">No</Button>
                        </LinkContainer>
                        {' '}
                        <LinkContainer to='/teams/create'>
                            <Button color="primary" size="lg">Yes</Button>
                        </LinkContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    </ContentContainer>
)

export default SignupComplete
