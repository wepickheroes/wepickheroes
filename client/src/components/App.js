import React, { Component } from 'react';
import {
    // BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import { withRouter } from 'react-router'

import '../styles/App.css';

import Index from './Index'
import { Navigation } from './layout'

class App extends Component {
    render() {
        console.log('App', this.props)
        return (
            <div>
                <div>
                    <Navigation/>
                    <Route exact path="/" component={Index} />
                </div>
            </div>
        );
    }
}

App = withRouter(App)

export default App;
