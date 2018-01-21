import React from 'react'
import styled from 'styled-components'
import { Button, Col, Container, Row } from 'reactstrap'
import { createUrl } from '../../api/utils'


const FinishSteam = props => (
    <div>
        Finish Steam
        <form action={createUrl('/complete/steam/')} method="post" role="form">
            <input type="hidden" name="partial_token" value={props.match.params.partial_token} />
            <div>
                <label>Email address:</label>
                <input id="email" type="email" name="email" />
            </div>
            <input type="submit" value="Submit" />
        </form>
    </div>
)

export default FinishSteam
