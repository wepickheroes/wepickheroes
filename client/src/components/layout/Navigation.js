import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import {
    Button, Collapse, DropdownToggle, DropdownMenu, DropdownItem,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavDropdown, NavItem, NavLink,
} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../../img/logos/logo.png'

const NavbarTitle = styled.h1`
    margin: 0;
    font-weight: bold;
`
const Uppercase = styled.span`
    text-transform: uppercase;
    letter-spacing: 1.5px;
`
const Logo = styled.img`
    height: 50px;
    margin-right: 1rem;
`
const SteamNavItem = styled(NavItem)`
    margin-left: 1rem;
`

class UserMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        return (
            <NavDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle caret nav>
                    <Uppercase>Settings</Uppercase>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>Edit Profile</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Logout</DropdownItem>
                </DropdownMenu>
            </NavDropdown>
        )
    }
}

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })

    render() {
        const { data: { error, loading, isAuthenticated = false } } = this.props
        return (
            <div>
                <Navbar dark color="dark" expand="md">
                    <NavbarTitle>
                        <NavbarBrand href="/">
                            <Logo src={logo} alt="logo" />
                            We Pick Heroes
                        </NavbarBrand>
                    </NavbarTitle>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/tournaments">
                                    <NavLink><Uppercase>Tournaments</Uppercase></NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/leagues">
                                    <NavLink><Uppercase>Leagues</Uppercase></NavLink>
                                </LinkContainer>
                            </NavItem>
                            {!loading && (
                                isAuthenticated ? <UserMenu /> : (
                                <SteamNavItem>
                                    <Button color="success" className="text-uppercase">
                                        <i className="fa fa-steam" />&nbsp;Sign In With Steam
                                    </Button>
                                </SteamNavItem>
                            ))}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const query = gql`query { isAuthenticated }`
export default graphql(query)(props => <Navigation {...props} />)
