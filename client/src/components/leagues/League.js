import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { LinkContainer } from 'react-router-bootstrap'
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Col,
    Container,
    Row,
    Table,
} from 'reactstrap'

import { Loading } from '../utils'
import { media } from '../../styles'

const DescriptionLabel = styled.dt`
    ${media.sm`text-align: right;`}
`

const LeagueDetails = ({ league }) => (
    <dl className='row'>
        <LeagueDetailRow label='Description'>
            {league.description}
        </LeagueDetailRow>
        <LeagueDetailRow label='Series per season'>
            {league.numSeriesPerSeason}
        </LeagueDetailRow>
        <LeagueDetailRow label='Games per series'>
            {league.numGamesPerSeries}
        </LeagueDetailRow>
        <LeagueDetailRow label='Registration'>
            Open
        </LeagueDetailRow>
    </dl>
)

const Divisions = props => {
    const { divisionSet } = props
    return (
        <ul>
            {divisionSet.map(division => (
                <li key={`division-${division.id}`}>
                    Division {division.number}: {division.name}
                </li>
            ))}
        </ul>
    )
}

const Seasons = props => {
    const { seasonSet } = props
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                {seasonSet.map(season => (
                    <tr key={`season-${season.id}`}>
                        <th scope="row">{season.number}</th>
                        <td>{moment(season.startDate).format('L')}</td>
                        <td>{moment(season.endDate).format('L')}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const LeagueDetailRow = ({ label, children }) => (
    <Fragment>
        <DescriptionLabel className='col-sm-4 col-md-3'>{label}</DescriptionLabel>
        <dd className='col-sm-8 col-md-9'>{children}</dd>
    </Fragment>
)

class League extends Component {
    render() {
        const {
            data: {
                loading, league,
            }
        } = this.props
        return (
            <Container>
                <div style={{ marginBottom: '1rem '}}>
                    <Link to='/leagues'>&larr;&nbsp;All Leagues</Link>
                </div>
                {loading ? <Loading /> : (
                    <div>
                        <h1 style={{ marginBottom: '2rem' }}>{league.name} League</h1>
                        <LeagueDetails league={league} />
                        <div className='text-center' style={{ marginBottom: '1rem' }}>
                            <Button color='success' size='lg'>Register Now</Button>
                        </div>
                        <h2>Divisions</h2>
                        <Divisions divisionSet={league.divisionSet} />
                        <h2>Seasons</h2>
                        <Seasons seasonSet={league.seasonSet} />
                    </div>
                )}
            </Container>
        )
    }
}

const query = gql`
query getLeague($id: UUID!) {
    league(id: $id) {
        id
        name
        description
        numGamesPerSeries
        numSeriesPerSeason
        seasonSet {
            id
            number
            startDate
            endDate
        }
        divisionSet {
            id
            number
            name
        }
    }
}
`

League = graphql(query, {
    options: ({ match: { params: { id } } }) => ({ variables: { id }})
})(League)

export default League
