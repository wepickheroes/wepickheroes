import React from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Row } from 'reactstrap'
import { createUrl } from '../../api/utils'

export const Intro = styled.div`
    margin: 2rem 0;
    text-align: left;
`
const Question = styled.div`

`

const Description = styled.div`
    margin: 0 auto 30px auto;
`
const Divider = styled.hr`
    margin: 5rem 0;
`

const MarketingList = styled.ol`
    margin-left: 2rem;
`

const FAQs = props => (
    <Container fluid>
        <Container>
          <Intro>
              <h1 className="display-4">FAQs</h1>
                <Description className="lead">
                What is PUSH League?
                PUSH League is a competitive amateur league focused on growth.
                Teams are divided into tiers and play against other teams in a round robin format to earn as many points as possible.
                The highest-ranked team win a reward and the get to play a promotional series against the lowest-scoring teams from the next-highest tier for a chance to advance for next season.

                How does the round robin point system work?
                For each assigned match-up teams will play two games against each other. Each victory is worth 2 points.

                How do you determine tiers?
                Entry tiers are determined based on the average medal ranking of a team’s players.

                Which regions do you support? How are servers determined?
                All regions are welcome to play, but right now games will only be played on USE servers.

                How do I register my team?
                You must first create a team page. When a player creates a team page, they will be prompted to send out invites to four other players via email.
                Once all five players have registered, the page will be approved.

                When do I play?
                Teams will be assigned matches that they must complete during a one-week period.
                Teams are responsible for organizing a time that works best for both parties. Matches can be played in any order within that week.

                What happens if a team does not show up after we schedule a time?
                If a team does not show up after you schedule a time, it results in an auto-win for both matches.

                How are lobbies created?
                Players will be responsible for creating lobbies at the scheduled time.

                How will scores be recorded?
                Team captains will submit final scores in Discord with screenshots of the post-game screen for each game.

                Can teams have subs?
                Teams are allowed 2 subs, for a total of 7 players.

                Can we use stand-ins?
                In the event that a 5th player is needed and neither sub can make it, permission for a stand-in can be requested.
                A stand-in must have approval from an admin.
                Stand-ins must be registered to the PUSH League website and must be eligible for the division they’re playing in.

                Can I cast games?
                All games except promotional or tournament matches are free for others to cast! Casters are required to cast via spectator mode and can not join a lobby.
                If you wish to cast let us know and we’ll plug your stream!

                </Description>

          </Intro>
        </Container>
    </Container>
)

export default FAQs
