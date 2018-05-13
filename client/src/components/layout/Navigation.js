import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'
import {
    Button, Collapse, DropdownToggle, DropdownMenu, DropdownItem,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSteam } from '@fortawesome/fontawesome-free-brands'

import { createUrl } from '../../api/utils'
import BrandImage from '../../img/logos/WPHlogo2sgcolors.svg'

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

const BrandLogo = styled.img`
    height: 30px;
`
const UserMenu = props => (
    <UncontrolledDropdown nav>
        <DropdownToggle caret nav>
            <Uppercase>Settings</Uppercase>
        </DropdownToggle>
        <DropdownMenu right>
            <LinkContainer to='/teams/create'>
                <DropdownItem>Create a Team</DropdownItem>
            </LinkContainer>
            <DropdownItem divider />
            <a href={createUrl('/logout')}>
                <DropdownItem>Logout</DropdownItem>
            </a>
        </DropdownMenu>
    </UncontrolledDropdown>
)

const HelpMenu = props => (
    <UncontrolledDropdown nav>
        <DropdownToggle caret nav>
            Resources
        </DropdownToggle>
        <DropdownMenu right>
            <LinkContainer to="/rules">
                <DropdownItem>Rules</DropdownItem>
            </LinkContainer>
            <LinkContainer to="/about">
                <DropdownItem>About</DropdownItem>
            </LinkContainer>
            <LinkContainer to="/faqs">
                <DropdownItem>FAQ</DropdownItem>
            </LinkContainer>
            <LinkContainer to="/contact">
                <DropdownItem>Contact</DropdownItem>
            </LinkContainer>
        </DropdownMenu>
    </UncontrolledDropdown>
)

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
                    <NavbarTitle style={{ marginRight: '2rem' }}>
                        <LinkContainer to='/'>
                            <NavbarBrand >
                                <BrandLogo src={BrandImage} alt="We Pick Heroes" />
                                &nbsp;<i><small>alpha</small></i>
                            </NavbarBrand>
                        </LinkContainer>
                    </NavbarTitle>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/leagues">
                                    <NavLink>Leagues</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/twitch-stream">
                                    <NavLink>Watch</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/my-teams">
                                    {/* TODO: Get number of new series */}
                                    <NavLink>My Teams</NavLink>
                                </LinkContainer>
                            </NavItem>
                            <HelpMenu />
                            {!loading && (
                                isAuthenticated ? <UserMenu /> : (
                                <SteamNavItem>
                                    <Button color="success"
                                            href={createUrl('/login/steam/')}>
                                        <FontAwesomeIcon icon={faSteam} />
                                        &nbsp;Sign in via Steam
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
