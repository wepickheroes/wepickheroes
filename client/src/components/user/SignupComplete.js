import React from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Form, FormGroup, FormText, Label, Input, Row } from 'reactstrap'
import { createUrl } from '../../api/utils'

const ContentContainer = styled.div`
    margin: 2rem 0;
`

const SignupComplete = props => (
    <ContentContainer>
        <Container>
            <h1 className='text-center'>Signup Complete!</h1>


            <Row>
                <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                    <h2>
                        Would you like to register a team?
                    </h2>
                    <Form>
                        <FormGroup>
                            <Label>Do you already have a team?</Label>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>

        </Container>
    </ContentContainer>
)

export default SignupComplete
