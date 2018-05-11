import React, { Fragment } from 'react'
import {
    Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
} from 'reactstrap'


const faqs = [
    {
        question: 'What is WPH League?',
        answer: <Fragment>
        The WPH League is a competitive amateur league focused on growth.
        We are currently hosting a double-elimination bracket format played on weekends.
        </Fragment>,
    },
    {
        question: 'Is there a Rank Cap?',
        answer: <Fragment>
            Right now the main cap we have is a restriction on <strong>Divine 5</strong> players
            that are rank 1500 or higher. Our current tournament league follows this rule
            - other formats may have tighter restrictions,
            which will be displayed within the league’s registration page.
        </Fragment>,
    },
    {
        question: 'Which regions do you support? How are servers determined?',
        answer: <Fragment>
            All regions are welcome to play! However, players must understand that we operate off of EST/PST time zones.
            The default server will be USE, but if teams can agree on an alternate arrangement they are allowed to play on their selected server.
        </Fragment>,
    },
    {
        question: 'How do I register my team?',
        answer: <Fragment>
            Your team captain must first create a team page.
            When your captain creates a team page, they will be prompted to send out an invite link to four additional players.
            Once all five players have registered, the page will be approved.
        </Fragment>,
    },
    {
        question: 'When do I play?',
        answer: <Fragment>
            Open Qualifiers will have a pre-set date, with a start time of <strong>12:00pm PST/3:00pm EST</strong>.
            Main bracket games will occur on Saturdays and Sundays within selected dates,
             with start times of <strong>11:00am PST/2:00pm EST</strong>.
        </Fragment>,
    },
    {
        question: 'Can teams have subs? What if I need a last-minute stand-in?',
        answer: <Fragment>
            Teams are allowed <strong>2</strong> official sub players.
            Should substitutes not be available, stand-ins may be used instead.
            However, stand-ins are not allowed for the semi-final and finals series of Upper and Lower Brackets.
            Substitutes and stand-ins must be registered to the site and attached to your team before the start of the game.
        </Fragment>,
    },
    {
        question: 'Can I cast games?',
        answer: <Fragment>
            We plan on having all games streamed on our official Twitch channel -
            if you wish to cast, please feel free to ask us in Discord!
        </Fragment>,
    },
]

export default props => (
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
