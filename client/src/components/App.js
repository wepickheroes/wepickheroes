import React, { Component } from 'react'
import {
    Route,
} from 'react-router-dom'

import Homepage from './Homepage'
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
        if (!csrftoken) {
            fetch(createUrl('/'), {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(resp => {
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
        return (attemptedRequest || csrftoken) && children
    }
}

class App extends Component {
    render() {
        return (
            <RequireCSRFToken>
                <div>
                    <Navigation/>
                    <Route exact path="/" component={Homepage} />
                    <Footer />
                </div>
            </RequireCSRFToken>
        )
    }
}


export default App;
