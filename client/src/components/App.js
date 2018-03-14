import React, { Component, Fragment } from 'react'
import {
    Route,
} from 'react-router-dom'

import Homepage from './Homepage'
import FinishSteam from './steam/FinishSteam'
import SignupComplete from './user/SignupComplete'
import AboutUs from './about/AboutUs'
import FAQs from './faq/FreqAsk'
import Schedule from './schedule/Schedule'
import { Footer, Navigation } from './layout'

class App extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <section className="container-fluid flex-grow">
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/faqs" component={FAQs} />
                    <Route exact path="/schedule" component={Schedule} />
                    <Route path="/signup-complete" component={SignupComplete} />
                    <Route path="/finish-steam/:partial_token" component={FinishSteam} />
                </section>
                <Footer />
            </Fragment>
        )
    }
}


export default App;
