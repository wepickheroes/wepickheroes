import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import '../styles/App.css';

import Index from './Index'
import { Navigation } from './layout'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navigation/>
                    <Route exact path="/wepickheroes" component={Index} />
                </div>
            </Router>
        );
    }
}

export default App;
