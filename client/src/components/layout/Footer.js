import React, { Component } from 'react'
import {
    Navbar, Nav, NavItem, NavLink,
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
    faDiscord,
    faRedditAlien,
    faSteam,
    faTwitch,
    faTwitter,
} from '@fortawesome/fontawesome-free-brands'

class Footer extends Component {

    render() {
        return (
            <div style={{ marginTop: "2rem" }}>
                <Navbar dark color="dark" expand="md">
                    <Nav navbar style={{ marginRight: '2rem' }}>
                        <NavItem>
                            <LinkContainer to='/about'>
                                <NavLink>About</NavLink>
                            </LinkContainer>
                        </NavItem>
                        <NavItem>
                            <LinkContainer to='/rules'>
                                <NavLink>Rules</NavLink>
                            </LinkContainer>
                        </NavItem>
                        <NavItem>
                            <LinkContainer to='/contact'>
                                <NavLink>Contact</NavLink>
                            </LinkContainer>
                        </NavItem>
                    </Nav>
                    <span className='navbar-text'>
                        Copyright &copy; {new Date().getFullYear()}, wepickheroes.com. Powered
                        by <a href='http://store.steampowered.com/'>Steam <FontAwesomeIcon icon={faSteam} /></a>
                    </span>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <NavLink href='https://www.twitch.tv/wepickheroes' target='_blank'>
                                <FontAwesomeIcon icon={faTwitch} size='2x' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://discord.gg/xdcFpBc' target='_blank'>
                                <FontAwesomeIcon icon={faDiscord} size='2x' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://twitter.com/wepickheroes' target='_blank'>
                                <FontAwesomeIcon icon={faTwitter} size='2x' />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://www.reddit.com/user/WePickHeroes/' target='_blank'>
                                <FontAwesomeIcon icon={faRedditAlien} size='2x' />
                            </NavLink>
                        </NavItem>
                    </Nav>
                  </Navbar>
            </div>
        );
    }
}

export default Footer
