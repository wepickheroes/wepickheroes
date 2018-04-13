import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'

import { ContentContainer, Loading } from '../utils'
import moment from "moment/moment"

const TeamName = ({ team, winner }) => {
    const Component = winner && team.id === winner.id ? 'strong' : 'span'
    return <Component>{team.name}</Component>
}

const DivisionSeason = props => {
    const {
        startDate,
        endDate,
        teams,
        division,
        season,
        season: {
            league,
        },
        seriestimewindowSet,
    } = props

    return (
        <Fragment>
            <p className='lead'>
                League: <Link to={`/leagues/${league.id}`}>{league.name}</Link>
            </p>
            <p className='lead'>
                Division {division.number} - {division.name}
            </p>
            <p className='lead'>
                Season {season.number}{' '}
                <small>
                    ({moment(startDate).format('L')} &mdash; {moment(endDate).format('L')})
                </small>
            </p>
            <h2>Teams</h2>
            <ul>
                {teams.map(team => (
                    <li key={`team-${team.id}`}>{team.name}</li>
                ))}
            </ul>
            <h2>Matchups</h2>
            {seriestimewindowSet.map((seriesTimeWindow, i) => (
                <Fragment key={`series-time-window-${seriesTimeWindow.id}`}>
                    <h3>
                        Week {i + 1}{' '}
                        <small className='text-muted'>
                            ({moment(seriesTimeWindow.startDate).format('L')}
                            {' '}&mdash;{' '}
                            {moment(seriesTimeWindow.endDate).format('L')})
                        </small>
                    </h3>
                    <ul>
                        {seriesTimeWindow.seriesSet.map(series => (
                            <li key={`series-${series.id}`}>
                                <TeamName team={series.teamA} winner={series.winner} />
                                {' '}vs.{' '}
                                <TeamName team={series.teamB} winner={series.winner} />
                            </li>
                        ))}
                    </ul>
                </Fragment>
            ))}
        </Fragment>
    )
}

class Schedule extends Component {

    render() {
        const {
            data: {
                loading,
                divisionSeason,
            }
        } = this.props

        return (
            <ContentContainer>
                <Container>
                    <h1>Schedule</h1>
                    {loading ? <Loading /> : <DivisionSeason {...divisionSeason} />}
                </Container>
            </ContentContainer>
        )
    }
}

const query = gql`
query ($id: UUID!) {
  divisionSeason(id: $id) {
    id
    startDate
    endDate
    teams {
      id
      name
    }
    division {
      id
      name
      number
    }
    season {
      id
      number
      league {
        id
        name
      }
    }
    seriestimewindowSet {
      id
      startDate
      endDate
      seriesSet {
        id
        teamA {
          id
          name
        }
        teamB {
          id
          name
        }
        winner {
          id
        }
      }
    }
  }
}
`

Schedule = graphql(query, {
    options: ({ match: { params: { id } } }) => ({ variables: { id }})
})(Schedule)

export default Schedule
