import React from 'react'
import styled from 'styled-components'
import { Container } from 'reactstrap'
import {
    Divider,
} from './../utils'

const RulesList = styled.ol`
    > li {
        font-weight: bold;
    }
`

export default () => (
    <Container>
        <h1>Rules</h1>
        <p>
            <strong>Disclaimer:</strong> These rules are not final and are subject to change.
            Changes in rules will be announced on Discord and on our site.
            In cases where rules are not clear, we reserve the right to make judgement calls and rule updates
            as we see fit.
            If there are any questions or concerns about the rules, please contact an administrator in the We
            Pick Heroes League Discord.
        </p>
        <h2>General</h2>
        <RulesList>
            <li>Teams</li>
            <ol>
                <li>Teams will consist of 5 primary players and up to 2 substitute players (7 total)</li>
                <ol>
                <li>Teams are allowed to bring additional stand-ins excluding the semi-final and finals series for Upper and Lower Bracket</li>
              </ol>
            </ol>
            <li>Players</li>
            <ol>
                <li>All players must be registered to the We Pick Heroes League website with their primary Steam
                    accounts.</li>
                <li>Players will only use the Steam account attached to their WPH League site profile during
                    league matches.</li>
                <li>All player accounts must be public with their current skill rating displayed on their profiles.</li>
                <li>Players that are found to be smurfing - whether by using an alternate personal Steam account or by
                    using a friend's Steam account - will result in themselves and their entire team being
                    disqualified, as well as forfeiting any winnings (if applicable).</li>
            </ol>
            <li>Subs</li>
            <ol>
                <li>Should a main roster player be unable to attend a match, a registered sub may take their place.</li>
                <li>Should a team be down a player and unable to find a substitute, they will be forced to
                    forfeit the series. </li>
            </ol>
            <li>Attendence</li>
            <ol>
                <li>All players are expected to be in lobby 5 minutes before game starting time. Lobby will always be up 30 minutes prior to starting time.</li>
                <li>Teams that are tardy and show up past game start time will be subject to the following penalties:</li>
                <ol>
                    <li>5 minutes after start time: Level 1 draft penalty.</li>
                    <li>10 minutes after start time: Level 2 draft penalty.</li>
                    <li>15 minutes after start time: 1 game deficit.</li>
                </ol>
            </ol>
            <li>Coin Flip</li>
            <ol>
                <li>When both captains are in lobby, admin will ask either side to call heads or tails
                  (first come, first serve). Winner has choice of pick or side.</li>
                <li>The coin flip loser will get first choice for Game 2.</li>
                <li>Should there be a Game 3, coin flip winner gets choice.</li>
            </ol>
            <li>Pausing</li>
            <ol>
                <li>Teams are allowed up to a combined total of 15 minutes of pause time for technical issues per series.</li>
                <li>There is a limit of 5 pauses for each team.</li>
                <li>The pausing team will not resume a game until agreement is clearly stated by both teams in game
                    chat.</li>
                <ol>
                    <li>Intentional unpausing of an opposing team's pause can result in penalties up to and including
                        a game deficit</li>
                </ol>
            </ol>
            <li>Behavior</li>
            <ol>
                <li>Any racist, misogynistic, homophobic or derogatory behavior is prohibited.</li>
                <li>Team names and individual player names must follow the above.</li>
                <li>All teams and players are expected to show maturity and respect towards other players, the
                    organizers, and the tournament.</li>
                <ol>
                    <li>If an admin deems that a player and/or team's conduct during a game is inappropriate, the
                        admin will determine the final call in penalizing said team.</li>
                </ol>
                <li>Should a player be found breaking the above, the player and their team will be subject to penalties
                  up to and including disqualification from the tournament.</li>
            </ol>
            <li>Broadcasting</li>
            <ol>
                <li>No lobby spectators are allowed outside of league administrators or broadcasters.</li>
                <li>Players can broadcast Open Qualifier matches.</li>
                <ol>
                    <li>If a player decides to broadcast their match, then they accept all potential risks associated
                        with streaming.</li>
                    <li>Tournament organizers will not enforce any reports of stream sniping.</li>
                </ol>
                <li>Players cannot broadcast promotional series matches.</li>
            </ol>
            <li>Prize Distribution</li>
            <ol>
                <li>All prize winnings will be distributed to team captains unless specified otherwise.</li>
                <li>The We Pick Heroes organization and tournament organizers are not responsible for any
                    mishandling of prize winnings within teams.</li>
            </ol>
          <Divider />
            <p><em>The We Pick Heroes organization reserves the right to amend, alter, or clarify these rules at any time.</em></p>
        </RulesList>
    </Container>
)
