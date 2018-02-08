import React, { Component } from 'react'
import {
    Navbar, Nav, NavItem, NavLink,
} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap'

class Footer extends Component {

    render() {
        return (
            <div style={{ marginTop: "2rem" }}>
                <Navbar dark color="dark" expand="md">
                    <Nav navbar>
                        <NavItem>
                            <LinkContainer to='about'>
                                <NavLink>About</NavLink>
                            </LinkContainer>
                        </NavItem>
                        <NavItem>
                            <LinkContainer to='blog'>
                                <NavLink>Blog</NavLink>
                            </LinkContainer>
                        </NavItem>
                        <NavItem>
                            <LinkContainer to='contact'>
                                <NavLink>Contact</NavLink>
                            </LinkContainer>
                        </NavItem>
                    </Nav>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <NavLink href='https://www.twitch.tv/wepickheroes'>
                                <i className='fab fa-2x fa-twitch' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://www.twitch.tv/wepickheroes'>
                                <i className='fab fa-2x fa-discord' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://www.twitch.tv/wepickheroes'>
                                <i className='fab fa-2x fa-facebook' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://www.twitch.tv/wepickheroes'>
                                <i className='fab fa-2x fa-twitter' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://www.twitch.tv/wepickheroes'>
                                <i className='fab fa-2x fa-reddit-square' />
                            </NavLink>
                        </NavItem>
                    </Nav>
                  </Navbar>
            </div>
        );
    }
}

export default Footer
