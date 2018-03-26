import React, { Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Container, Row } from 'reactstrap'

import { MyTeams } from '../teams'
import { Loading } from '../utils'

const SignupComplete = props => {
    const { data: { loading, myTeams } } = props
    return (
        <Container>
            <h1 className='text-center'>Signup Complete!</h1>
            <Row>
                <Col sm='12' md={{ size: '6', offset: '3' }} lg={{ size: '8', offset: '2' }}>
                    {loading ? <Loading /> : (
                        myTeams.length === 0 ? (
                            <Fragment>
                                <h2 className='text-center'>
                                    Would you like to create a team?
                                </h2>
                                <div className='text-center'>
                                    <LinkContainer to='/' exact>
                                        <Button color="secondary" size="lg">No</Button>
                                    </LinkContainer>
                                    {' '}
                                    <LinkContainer to='/teams/create'>
                                        <Button color="primary" size="lg">Yes</Button>
                                    </LinkContainer>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <MyTeams />
                            </Fragment>
                        )
                    )}
                </Col>
            </Row>


        </Container>
    )
}

const query = gql`
query {
    myTeams {
        id
    }
}`

export default graphql(query)(SignupComplete)
