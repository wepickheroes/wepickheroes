import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import { Button, Col, Container, Form, FormGroup, FormText, Label, Input, Row } from 'reactstrap'
import { createUrl } from '../../api/utils'

const ContentContainer = styled.div`
    margin: 2rem 0;
`

const RegisterTeamQuestion = props => (
    <Fragment>
        <h2 className='text-center'>
            Would you like to register a team?
        </h2>
        <div className='text-center'>
            <LinkContainer to='/'>
                <Button color="secondary" size="lg">No</Button>
            </LinkContainer>
            {' '}
            <LinkContainer to='/signup-complete/team'>
                <Button color="primary" size="lg">Yes</Button>
            </LinkContainer>
        </div>
    </Fragment>
)

const RegisterTeamForm = props => (
    <Fragment>
        <h2 className='text-center'>
            Register a team
        </h2>
    </Fragment>
)

const SignupComplete = props => (
    <ContentContainer>
        <Container>
            <h1 className='text-center'>Signup Complete!</h1>
            <Row>
                <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                    <Route path="/signup-complete" component={RegisterTeamQuestion} exact />
                    <Route path="/signup-complete/team" component={RegisterTeamForm} exact />
                </Col>
            </Row>
        </Container>
    </ContentContainer>
)

export default SignupComplete
