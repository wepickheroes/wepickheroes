import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Form, FormGroup, FormText, Label, Input, Row } from 'reactstrap'
import { createUrl } from '../../api/utils'
import { Intro } from '../Homepage'

class FinishSteam extends Component {
    state = {
        acceptInvite: null,
    }

    componentDidMount() {
        this.setState({
            acceptInvite: localStorage.getItem('acceptInvite')
        })
    }

    render() {
        const {
            match: { params: { partial_token } },
        } = this.props
        const { acceptInvite } = this.state
        return (
            <Container>
                <Intro>
                    <h1>Finish Signup</h1>
                </Intro>
                <Row>
                    <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '4', offset: '4' }}>
                        <Form action={createUrl('/complete/steam/?next=/social-redirect/my-teams')} method="post">
                            <input type="hidden" name="partial_token" value={partial_token} />
                            {acceptInvite && <input type="hidden" name="accept_invite" value={acceptInvite} />}
                            <FormGroup>
                                <Label for='email'>Email Address</Label>
                                <Input id='email' type='email' name='email' />
                                <FormText>
                                    Your email is private. You can change your email preferences from your settings. We do
                                    not share or sell your personal information.
                                </FormText>
                            </FormGroup>
                            <div className='text-center'>
                                <Button color='success'>Submit</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FinishSteam
