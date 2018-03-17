import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Col, Container, Form, FormGroup, Label, Input, Row } from 'reactstrap'

import { ContentContainer} from '../utils'

class CreateTeam extends Component {
    state = {
        formValues: {
            name: '',
        },
    }

    handleChange = inputName => e => {
        const value = e.target.value
        this.setState((prevProps, prevState) => ({
            formValues: {
                ...prevState.formValues,
                [inputName]: value,
            }
        }))
    }

    handleSubmit = e => {
        const { history, mutate } = this.props
        const { formValues: { name } } = this.state
        e.preventDefault()
        mutate({
            variables: {
                name
            }
        }).then(({ data: { createTeam: { ok, team } } }) => {
            history.push(`/my-teams/${team.id}`)
        }).catch(error => {
            console.error('error', error)
        })
    }

    render() {
        const { formValues: { name } } = this.state
        return (
            <ContentContainer>
                <Container>
                    <h1>Create a Team</h1>
                    <Row>
                        <Col sm='12' md={{ size: '4' }} lg={{ size: '6' }}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for='name'>Team Name</Label>
                                    <Input type='text' name='name' id='name'
                                           value={name} onChange={this.handleChange('name')} />
                                </FormGroup>
                                <Button>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </ContentContainer>
        )
    }
}

const createTeamMutation = gql`
    mutation createTeamMutation($name: String!) {
        createTeam(name: $name) {
            ok
            team {
                id
            }
        }
    }
`

CreateTeam = graphql(createTeamMutation)(CreateTeam)

export default CreateTeam
