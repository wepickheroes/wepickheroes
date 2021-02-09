import React, { Component, Fragment } from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'

import {
    League,
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
import {
    About,
    Contact,
    FAQ,
    Rules,
    TwitchStream,
} from './content'
import { Schedule } from './schedule'
import { Footer, Navigation } from './layout'
import { ContentContainer } from './utils'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-118590222-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <section className="flex-grow">
                    <ContentContainer>
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/contact" component={Contact} />
                            <Route exact path="/faqs" component={FAQ} />
                            <Route exact path="/rules" component={Rules} />
                            <Route exact path="/schedule" component={Schedule} />
                            <Route exact path="/leagues" component={Leagues} />
                            <Route exact path="/leagues/:id" component={League} />
                            <Route exact path="/division-seasons/:id" component={Schedule} />
                            <Route exact path="/twitch-stream" component={TwitchStream} />
                            <Route path="/signup-complete" component={SignupComplete} />
                            <Route path="/finish-steam/:partial_token" component={FinishSteam} />
                            <Route path="/teams/create" component={CreateTeam} />
                            <Route path="/accept-invite/:id" component={AcceptTeamInvite} />
                            <Route path="/my-teams" exact component={MyTeams} />
                            <Route path="/my-teams/:id" component={ManageTeam} />
                            <Route component={() => <h1>404: Not Found</h1>} />
                        </Switch>
                    </ContentContainer>
                </section>
                <Footer />
            </Fragment>
        )
    }
}


export default App;
