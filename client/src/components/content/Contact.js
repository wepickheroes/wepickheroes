import React from 'react'
import { Container } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/fontawesome-free-brands'

const discordLink = (
    <a href='https://discord.gg/xdcFpBc'
       style={{ whiteSpace: 'nowrap' }}
       target='_blank'
       rel='noopener noreferrer'>
        <FontAwesomeIcon icon={faDiscord} />&nbsp;Discord
    </a>
)
export default () => (
    <Container>
        <h1>Contact</h1>
        <p>
            If you have any questions, concerns, issues or feedback the best way to contact someone is
            on our {discordLink}. You can either flag us there or directly message one of our
            administration staff.
        </p>
    </Container>
)
