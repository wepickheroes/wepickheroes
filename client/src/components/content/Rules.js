import React from 'react'
import styled from 'styled-components'
import { Container } from 'reactstrap'

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
                <li>Rosters will be locked at the start of a season.</li>
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
                <li>The opposing team must be notified of the substitution before the series begins.</li>
                <li>Should a team be down a player and unable to find a substitute, they will be forced to
                    forfeit the series. </li>
            </ol>
            <li>Match Scheduling</li>
            <ol>
                <li>Teams will be assigned 2 series every Saturday at 12:00am PT, to be completed by the following
                    Saturday at 12:00am PT.</li>
                <li>Teams are responsible for scheduling matches between themselves.</li>
                <li>Teams must check-in with Discord by posting in the "Check-In" channel.</li>
                <ol>
                    <li>Should a team fail to show up, the other team will receive an auto-win for both matches.</li>
                    <li>Should both teams fail to show, both teams will receive auto-losses.</li>
                </ol>
                <li>Teams that are tardy ("tardy" defined as not having all 5 players ready in the lobby) and show
                    up past the agreed-upon start time will be subject to the following penalties:</li>
                <ol>
                    <li>5 minutes after start time: Level 1 draft penalty</li>
                    <li>10 minutes after start time: Level 2 draft penalty</li>
                    <li>15 minutes after start time: 1 game deficit</li>
                </ol>
                <li>Should a team fail to show up past 20 minutes, their opponent will receive an auto-win for both matches.</li>
            </ol>
            <li>Coin Flip</li>
            <ol>
                <li>When both captains are in lobby, the captain of the team that first checked in will ask the
                    other team's captain to call heads or tails. Winner has first choice of pick or side.</li>
                <li>The coin flip loser will get first choice for Game 2.</li>
            </ol>
            <li>Pausing</li>
            <ol>
                <li>Teams are allowed up to 10 minutes of pause time for technical issues per series.</li>
                <li>No limit on the number of pauses.</li>
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
                <li>If an admin deems that a player and/or team's conduct during a game is inappropriate, the admin
                    will determine the final call in penalizing said team.</li>
            </ol>
            <li>Broadcasting</li>
            <ol>
                <li>No lobby spectators are allowed outside of league administrators or broadcasters.</li>
                <li>Players can broadcast their matches.</li>
                <ol>
                    <li>If a player decides to broadcast their match, then they accept all potential risks associated
                        with streaming.</li>
                    <li>League organizers will not enforce any reports of stream sniping.</li>
                </ol>
                <li>Players cannot broadcast promotional series matches.</li>
            </ol>
            <li>Prize Distribution</li>
            <ol>
                <li>All prize winnings will be distributed to team captains unless specified otherwise.</li>
                <li>The We Pick Heroes organization and tournament organizers are not responsible for any
                    mishandling of prize winnings within teams.</li>
            </ol>
        </RulesList>
    </Container>
)
