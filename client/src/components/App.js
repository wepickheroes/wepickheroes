import React, { Component, Fragment } from 'react'
import {
    Route,
} from 'react-router-dom'

import {
    AcceptTeamInvite,
    CreateTeam,
    ManageTeam,
    MyTeams,
} from './teams'
import Homepage from './Homepage'
import FinishSteam from './steam/FinishSteam'
import SignupComplete from './user/SignupComplete'
import AboutUs from './about/AboutUs'
import FAQs from './faq/FreqAsk'
import { Footer, Navigation } from './layout'

class App extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <section className="flex-grow">
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/faqs" component={FAQs} />
                    <Route path="/signup-complete" component={SignupComplete} />
                    <Route path="/finish-steam/:partial_token" component={FinishSteam} />
                    <Route path="/teams/create" component={CreateTeam} />
                    <Route path="/accept-invite/:id" component={AcceptTeamInvite} />
                    <Route exact path="/my-teams" component={MyTeams} />
                    <Route path="/my-teams/:id" component={ManageTeam} />
                </section>
                <Footer />
            </Fragment>
        )
    }
}


export default App;
