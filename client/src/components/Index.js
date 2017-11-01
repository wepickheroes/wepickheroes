import React from 'react';
import styled from 'styled-components'
import { Button, Jumbotron } from 'reactstrap'

const Intro = styled(Jumbotron)`
    margin: 2rem 0;
`

const Index = () => (
    <div className="container">
        <Intro>
            <h1 className="display-3">We Pick Heroes</h1>
            <h2>Amateur Dota 2 League</h2>
            <hr className="my-4" />
            <p className="lead">
                Be a part of the first amateur Dota 2 competitive league. All skill levels are
                accepted. Registration is free and easy.
            </p>
            <Button color="success" size="lg">
                <i className="fa fa-steam" />&nbsp;Sign Up
            </Button>
        </Intro>
    </div>
)

export default Index
