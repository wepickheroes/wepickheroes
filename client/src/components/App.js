import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from 'react-router-dom'

import Index from './Index'
import { Navigation } from './layout'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navigation/>
                    <Route exact path="/" render={() => <Redirect to="/wepickheroes" />} />
                    <Route path="/wepickheroes" component={Index} />
                </div>
            </Router>
        );
    }
}


export default App;
