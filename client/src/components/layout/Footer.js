import React, { Component } from 'react'
import styled from 'styled-components'
import {
    Navbar, Nav, NavItem, NavLink,
} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Uppercase = styled.span`
    text-transform: uppercase;
    letter-spacing: 1.5px;
`

class Footer extends Component {

    render() {
        console.log('Footer', this.props)
        return (
            <div style={{ marginTop: "2rem" }}>
                <Navbar light expand="md" style={{ backgroundColor: '#e3f2fd' }}>
                    <Nav navbar>
                        <span className="navbar-text">
                            &copy; 2017, We Pick Heroes
                        </span>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Footer
