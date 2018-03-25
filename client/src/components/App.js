import React, { Component, Fragment } from 'react'
import {
    Route,
} from 'react-router-dom'

import {
    Leagues,
} from './leagues'
import {
    AcceptTeamInvite,
    CreateTeam,
    ManageTeam,
    MyTeams,
} from './teams'
import Homepage from './Homepage'
import FinishSteam from './steam/FinishSteam'
import {
    SignupComplete
} from './user'
import AboutUs from './about/AboutUs'
import FAQs from './faq/FreqAsk'
import { Schedule } from './schedule'
import { Footer, Navigation } from './layout'
import { ContentContainer } from './utils'

class App extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <section className="flex-grow">
                    <ContentContainer>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/about" component={AboutUs} />
                        <Route exact path="/faqs" component={FAQs} />
                        <Route exact path="/schedule" component={Schedule} />
                        <Route exact path="/leagues" component={Leagues} />
                        <Route path="/signup-complete" component={SignupComplete} />
                        <Route path="/finish-steam/:partial_token" component={FinishSteam} />
                        <Route path="/teams/create" component={CreateTeam} />
                        <Route path="/accept-invite/:id" component={AcceptTeamInvite} />
                        <Route path="/my-teams" exact component={MyTeams} />
                        <Route path="/my-teams/:id" component={ManageTeam} />
                    </ContentContainer>
                </section>
                <Footer />
            </Fragment>
        )
    }
}


export default App;
