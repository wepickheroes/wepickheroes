import React from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Form, FormGroup, FormText, Label, Input, Row } from 'reactstrap'
import { createUrl } from '../../api/utils'
import { Intro } from '../Homepage'

const FinishSteam = props => (
    <Container>
        <Intro>
            <h1>Finish Signup</h1>
        </Intro>
        <Row>
            <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '4', offset: '4' }}>
                <Form action={createUrl('/complete/steam/')} method="post">
                    <input type="hidden" name="partial_token" value={props.match.params.partial_token} />
                    <FormGroup>
                        <Label for='email'>Email Address</Label>
                        <Input id='email' type='email' name='email' />
                    </FormGroup>
                    <div className='text-center'>
                        <Button color='success'>Submit</Button>
                    </div>
                </Form>
            </Col>
        </Row>

    </Container>
)

export default FinishSteam
