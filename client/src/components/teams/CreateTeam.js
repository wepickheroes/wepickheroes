import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import { Button, Col, Container, Form, FormGroup, FormText, Label, Input, Row } from 'reactstrap'

import { ContentContainer} from '../utils'

class CreateTeam extends Component {
    render() {
        return (
            <ContentContainer>
                <Container>
                    <h1>Create a Team</h1>
                    <Row>
                        <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                            <Form>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </ContentContainer>
        )
    }
}

export default CreateTeam
