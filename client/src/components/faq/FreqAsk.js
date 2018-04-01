import React, { Fragment } from 'react'
import {
    Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap'


const faqs = [
    {
        question: 'What is WPH League?',
        answer: <Fragment>
        The WPH League is a competitive amateur league focused on growth.
        Teams are divided into tiers and play against other teams in a round robin format to earn as many points as possible.
        The highest-ranked team win a reward and the get to play a promotional series against the lowest-scoring
        teams from the next-highest tier for a chance to advance for next season.
        </Fragment>,
    },
    {
        question: 'How does the round robin point system work?',
        answer: <Fragment>
            For each assigned match-up teams will play two games against each other. Each victory is worth 2 points.
        </Fragment>,
    },
    {
        question: 'How do you determine tiers?',
        answer: <Fragment>
            Entry tiers are determined based on the average medal ranking of a team’s players.
        </Fragment>,
    },
    {
        question: 'Which regions do you support? How are servers determined?',
        answer: <Fragment>
            All regions are welcome to play, but right now games will only be played on USE servers.
        </Fragment>,
    },
    {
        question: 'How do I register my team?',
        answer: <Fragment>
            You must first create a team page. When a player creates a team page, they will be prompted to send out
            invites to four other players via email.
            Once all five players have registered, the team will be approved.
        </Fragment>,
    },
    {
        question: 'When do I play?',
        answer: <Fragment>
            Teams will be assigned matches that they must complete during a one-week period.
            Teams are responsible for organizing a time that works best for both parties. Matches can be played in any
            order within that week.
        </Fragment>,
    },
    {
        question: 'What happens if a team does not show up after we schedule a time?',
        answer: <Fragment>
            If a team does not show up after you schedule a time, it results in an auto-win for both matches.
        </Fragment>,
    },
    {
        question: 'How are lobbies created?',
        answer: <Fragment>
            Players will be responsible for creating lobbies at the scheduled time.
        </Fragment>,
    },
    {
        question: 'How will scores be recorded?',
        answer: <Fragment>
            Team captains will submit final scores in Discord with screenshots of the post-game screen for each game.
        </Fragment>,
    },
    {
        question: 'Can teams have subs?',
        answer: <Fragment>
            Teams are allowed 2 subs, for a total of 7 players.
        </Fragment>,
    },
    {
        question: 'Can we use stand-ins?',
        answer: <Fragment>
            In the event that a 5th player is needed and neither sub can make it, permission for a stand-in can be
            requested.
            A stand-in must have approval from an admin.
            Stand-ins must be registered to the WPH League website and must be eligible for the division they’re
            playing in.
        </Fragment>,
    },
    {
        question: 'Can I cast games?',
        answer: <Fragment>
            All games except promotional or tournament matches are free for others to cast! Casters are required to
            cast via spectator mode and can not join a lobby.
            If you wish to cast let us know and we’ll plug your stream!
        </Fragment>,
    },
]

const FAQs = props => (
    <Container>
        <h1 style={{ marginBottom: '1rem' }}>Frequently Asked Questions</h1>
        <ListGroup>
            {faqs.map(({ question, answer}, i) => (
                <ListGroupItem key={`faq-${i}`}>
                    <ListGroupItemHeading>{question}</ListGroupItemHeading>
                    <ListGroupItemText>{answer}</ListGroupItemText>
                </ListGroupItem>
            ))}
        </ListGroup>
    </Container>
)

export default FAQs
