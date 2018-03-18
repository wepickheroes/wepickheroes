import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Container,Table } from 'reactstrap'

import { ContentContainer, Loading } from '../utils'

const SeriesTable = props => {
    const { seasonSeries } = props
    return (
        <Table>
            <thead>
                <tr>
                    <th>Team A</th>
                    <th>Team B</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th># Games</th>
                    <th>Results</th>
                </tr>
            </thead>
            <tbody>
                {seasonSeries.map(series => (
                    <tr key={`series-row-${series.id}`}>
                        <td>{series.teamA.name}</td>
                        <td>{series.teamB.name}</td>
                        <td>{series.startDate}</td>
                        <td>{series.endDate}</td>
                        <td>{series.numGames}</td>
                        <td>TDB</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

class Schedule extends Component {

    render() {
        const {
            data: { loading, allSeasons }
        } = this.props

        return (
            <ContentContainer>
                <Container>
                    <h1>Schedule</h1>
                    {loading ? <Loading /> : (
                        <Fragment>
                            {allSeasons.map(season => (
                                <Fragment key={`season-${season.id}`}>
                                    <h2>
                                        Season {season.number}{' '}
                                        <small className='text-muted'>
                                            {season.startDate}&mdash;{season.endDate}
                                        </small>
                                    </h2>
                                    <SeriesTable seasonSeries={season.leagueseriesSet} />
                                </Fragment>
                            ))}
                        </Fragment>
                    )}
                </Container>
            </ContentContainer>
        )
    }
}


const query = gql`query {
    allSeasons {
        id
        number
        startDate
        endDate
        leagueseriesSet {
          id
          teamA {
            id
            name
          }
          teamB {
            id
            name
          }
          startDate
          endDate
          numGames
        }
      }
    }
`
Schedule = graphql(query)(Schedule)

export default Schedule
