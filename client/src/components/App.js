import React, { Component } from 'react';
import {
    Route,
} from 'react-router-dom'

import Index from './Index'
import { Footer, Navigation } from './layout'
import { createUrl, getCookie } from '../api/utils'

class RequireCSRFToken extends Component {
    constructor(props) {
        super(props)
        this.state = {
            attemptedRequest: false,
            csrftoken: getCookie('csrftoken'),
        }
    }
    componentDidMount() {
        const { csrftoken } = this.state
        console.log('RequireCSRFToken mount', this.state)
        if (!csrftoken) {
            fetch(createUrl('/'), {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(resp => {
                console.log('Response:', resp)
                this.setState({
                    attemptedRequest: true,
                    csrftoken: getCookie('csrftoken'),
                })
            })
        }
    }
    render() {
        const { children } = this.props
        const { attemptedRequest, csrftoken } = this.state
        return (attemptedRequest || csrftoken) && (
            <div>
                <p>RequireCSRFToken: {Object.keys(this.state).map(k => `${k}: ${this.state[k].toString()}; `)}</p>
                {children}
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <RequireCSRFToken>
                <div>
                    <Navigation/>
                    <Route exact path="/" component={Index} />
                    <Footer />
                </div>
            </RequireCSRFToken>
        )
    }
}


export default App;
