import React, { Component } from 'react'
import { compose } from 'redux'
import { connectRequest, querySelectors } from 'redux-query'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
    Button, Collapse, DropdownToggle, DropdownMenu, DropdownItem,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavDropdown, NavItem, NavLink,
} from 'reactstrap';


class LeagueList extends Component {

    render() {
        console.log('LeagueList', this.props)
        const { leagues: { data, metadata: { isFinished } } } = this.props
        return (
            <div>
                <Navbar light expand="md" style={{ backgroundColor: '#e3f2fd' }}>
                    <NavbarBrand href="/">
                        <Logo src={logo} alt="logo" /><strong>We Pick Heroes</strong>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <LinkContainer to="/">
                                    <NavLink><Uppercase>Tournaments</Uppercase></NavLink>
                                </LinkContainer>
                            </NavItem>
                            <NavItem>
                                <LinkContainer to="/">
                                    <NavLink><Uppercase>Leagues</Uppercase></NavLink>
                                </LinkContainer>
                            </NavItem>
                            {isFinished && data ? (
                                <UserMenu user={data} />
                            ) : (
                                <SteamNavItem>
                                    <Button color="success" className="text-uppercase">
                                        <i className="fa fa-steam" />&nbsp;Sign In With Steam
                                    </Button>
                                </SteamNavItem>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const query = {
    url: "/api/0/leagues",
    transform: (json, text) => {
        return { leagues: json }
    },
    update: {
        user: (prevLeagues, leagues) => user
    }
}

LeagueList = compose(
    connect(state => {
        return {
            user: {
                data: state.entities.user,
                metadata: { isFinished: querySelectors.isFinished(state.queries, query) },
            }
        }
    }),
    connectRequest(props => ([query]))
)(LeagueList)

export default Navigation
