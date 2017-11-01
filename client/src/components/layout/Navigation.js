import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink as _NavLink } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../../img/logos/logo.png'

const NavLink = styled(_NavLink)`
    text-transform: uppercase;
    letter-spacing: 1.5px;
`

const StyledNavLink = styled(NavLink)`
    text-transform: uppercase;
    letter-spacing: 1.5px;
`
const Logo = styled.img`
    height: 50px;
    margin-right: 1rem;
`


class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => this.setState({
        isOpen: !this.state.isOpen
    });

    render() {
        return (
            <div>
                <Navbar color="red" light expand="md" style={{ backgroundColor: '#e3f2fd' }}>
                    <NavbarBrand href="/">
                        <Logo src={logo} alt="logo" /><strong>We Pick Heroes</strong>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/">
                                    <NavLink>Tournaments</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/">
                                    <NavLink>Leagues</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <Button color="success" className="text-uppercase">
                                    <i className="fa fa-steam" />&nbsp;Sign In With Steam
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation
