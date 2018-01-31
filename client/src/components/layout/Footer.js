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
        return (
            <div style={{ marginTop: "2rem" }}>
                <Navbar dark color="dark" expand="md">

                    <nav class="navbar navbar-expand-md navbar-dark bg-dark">

                    <ul class="mr-auto navbar-nav">
                    <a href="https://www.twitch.tv/wepickheroes" class="pr-2 navbar-text">About</a>
                    <span class="pr-2 navbar-text"> | </span>
                    <a href="https://www.twitch.tv/wepickheroes" class="pr-2 navbar-text">Blog</a>
                    <span class="pr-2 navbar-text"> | </span>
                    <a href="https://www.twitch.tv/wepickheroes" class="navbar-text">Contact Us</a>
                    </ul>

                    <ul class="pr-3 navbar-nav">
                    <a href="https://www.twitch.tv/wepickheroes" class="fa fa-2x fa-twitch navbar-text"></a>
                      </ul>

                    <ul class="pr-3 navbar-nav">
                    <a href="https://www.twitch.tv/wepickheroes" class="fa fa-2x fa-simplybuilt navbar-text"></a>
                      </ul>

                    <ul class="pr-3 navbar-nav">
                    <a href="https://www.twitch.tv/wepickheroes" class="fa fa-2x fa-facebook navbar-text"></a>
                      </ul>

                    <ul class="pr-3 navbar-nav">
                    <a href="https://www.twitch.tv/wepickheroes" class="fa fa-2x fa-twitter navbar-text"></a>
                      </ul>

                    <ul class="pr-3 navbar-nav">
                    <a href="https://www.twitch.tv/wepickheroes" class="fa fa-2x fa-reddit-square navbar-text"></a>
                      </ul>



                    </nav>

                  </Navbar>
            </div>
        );
    }
}

export default Footer
