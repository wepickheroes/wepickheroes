import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import {
    Button, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { createUrl } from '../../api/utils'
import {
    Divider,
    BrandImage,
} from '../utils'
import logoImg from '../../img/logos/WPHlogo1.svg'

const NavbarTitle = styled.h1`
    font-weight: bold;
`
const Uppercase = styled.span`
    text-transform: uppercase;
    letter-spacing: 1.5px;
`
const SteamNavItem = styled(NavItem)`
    margin-left: 1rem;
`

class UserMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
        }
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        return (
            <Dropdown nav isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle caret nav>
                    <Uppercase>Settings</Uppercase>
                </DropdownToggle>
                <DropdownMenu right>
                    {/*<LinkContainer to='/profile'>*/}
                        {/*<DropdownItem>Edit Profile</DropdownItem>*/}
                    {/*</LinkContainer>*/}
                    <LinkContainer to='/my-teams'>
                        <DropdownItem>My Teams</DropdownItem>
                    </LinkContainer>
                    <LinkContainer to='/teams/create'>
                        <DropdownItem>Register a Team</DropdownItem>
                    </LinkContainer>
                    {/*<LinkContainer to='/settings'>*/}
                        {/*<DropdownItem>Settings</DropdownItem>*/}
                    {/*</LinkContainer>*/}
                    <DropdownItem divider />
                    <a href={createUrl('/logout')}>
                        <DropdownItem>Logout</DropdownItem>
                    </a>
                </DropdownMenu>
            </Dropdown>
        )
    }
}

class Navigation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
        }
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })

    render() {
        const { data: { loading, isAuthenticated = false } } = this.props
        return (
            <div>
                <Navbar dark color="dark" expand="md">
                    <NavbarTitle>
                        <LinkContainer to='/'>
                            <NavbarBrand>
                                <BrandImage src={logoImg} />
                            </NavbarBrand>
                        </LinkContainer>
                    </NavbarTitle>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/about">
                                    <NavLink><Uppercase>About</Uppercase></NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/faqs">
                                    <NavLink><Uppercase>FAQ</Uppercase></NavLink>
                                </LinkContainer>
                            </NavItem>
                            {/*<NavItem>*/}
                                {/*<LinkContainer to="/tournaments">*/}
                                    {/*<NavLink><Uppercase>Tournaments</Uppercase></NavLink>*/}
                                {/*</LinkContainer>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                                {/*<LinkContainer to="/leagues">*/}
                                    {/*<NavLink><Uppercase>Leagues</Uppercase></NavLink>*/}
                                {/*</LinkContainer>*/}
                            {/*</NavItem>*/}
                            <NavItem>
                                <LinkContainer to="/schedule">
                                    <NavLink><Uppercase>Schedule</Uppercase></NavLink>
                                </LinkContainer>
                            </NavItem>
                            {!loading && (
                                isAuthenticated ? <UserMenu /> : (
                                <SteamNavItem>
                                    <Button color="success" className="text-uppercase"
                                            href={createUrl('/login/steam/?next=/social-redirect/signup-complete')}>
                                        <i className="fab fa-steam" />&nbsp;Sign In With Steam
                                    </Button>
                                </SteamNavItem>
                            ))}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const query = gql`query { isAuthenticated }`
export default graphql(query)(props => <Navigation {...props} />)
