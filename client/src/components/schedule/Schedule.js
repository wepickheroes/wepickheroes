import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Table } from 'reactstrap'
import { Link } from 'react-router-dom'

import { ContentContainer, Loading } from '../utils'
import moment from "moment/moment"

// const SeriesTable = props => {
//     const { seasonSeries } = props
//     return (
//         <Table>
//             <thead>
//                 <tr>
//                     <th>Team A</th>
//                     <th>Team B</th>
//                     <th>Start Date</th>
//                     <th>End Date</th>
//                     <th># Games</th>
//                     <th>Results</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {seasonSeries.map(series => (
//                     <tr key={`series-row-${series.id}`}>
//                         <td>{series.teamA.name}</td>
//                         <td>{series.teamB.name}</td>
//                         <td>{series.startDate}</td>
//                         <td>{series.endDate}</td>
//                         <td>{series.numGames}</td>
//                         <td>TDB</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </Table>
//     )
// }

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
        seriesSet,
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
  divisionSeason(id:$id){
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
    seriesSet {
      id
      startDate
      endDate
      teamA{
        id
        name
      }
      teamB{
        id
        name
      }
    }
  }
}
`

Schedule = graphql(query, {
    options: ({ match: { params: { id } } }) => ({ variables: { id }})
})(Schedule)

export default Schedule
