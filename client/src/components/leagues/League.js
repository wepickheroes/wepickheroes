import React, { Component, Fragment } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { withRouter } from 'react-router'
import styled  from 'styled-components'
import {
    Button,
    Container,
    Collapse,
    Table,
} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
    faArrowLeft,
    faChevronCircleRight,
    faChevronCircleDown,
} from '@fortawesome/fontawesome-free-solid'

import { RegisterButton } from '.'
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
    const { divisionSet, location } = props
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


const DivisionSeason = props => {
    const { divisionSeason: { id, division } } = props
    return (
        <Fragment>
            <tr>
                <td>
                    Divison {division.number}: {division.name}
                </td>
                <td>
                    <LinkContainer to={`/division-seasons/${id}`}>
                        <Button color="primary">
                            View Schedule&nbsp;
                            <FontAwesomeIcon icon={faChevronCircleRight}/>
                        </Button>
                    </LinkContainer>
                </td>
            </tr>
        </Fragment>
    )
}

class Season extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse })
    }

    render() {
        const { season } = this.props
        const { collapse } = this.state
        return (
            <Fragment>
                <tr>
                    <th scope="row">Season {season.number}</th>
                    <td>{moment(season.startDate).format('L')}</td>
                    <td>{moment(season.endDate).format('L')}</td>
                    <td>
                        <Button onClick={this.toggle} color="primary">
                            <FontAwesomeIcon icon={collapse ? faChevronCircleDown : faChevronCircleRight}/>
                            &nbsp;Divisions
                        </Button>
                    </td>
                </tr>
                <Collapse isOpen={collapse} tag='tr'>
                    <td />
                    <td colSpan='3'>
                        <Table>
                            <tbody>
                                {season.divisionseasonSet.map(divisionSeason => (
                                    <DivisionSeason key={`seasondivision-season-${divisionSeason.id}`}
                                                    divisionSeason={divisionSeason} />
                                ))}
                            </tbody>
                        </Table>
                    </td>
                </Collapse>
            </Fragment>
        )
    }
}

class Seasons extends Component {

    render() {
        const { seasonSet } = this.props
        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                    {seasonSet.map(season => <Season key={`season-${season.id}`} season={season} />)}
                </tbody>
            </Table>
        )
    }
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
                loading,
                league,
            }
        } = this.props
        return (
            <Container>
                <div style={{ marginBottom: '1rem '}}>
                    <Link to='/leagues'>
                        <FontAwesomeIcon icon={faArrowLeft} />&nbsp;All Leagues
                    </Link>
                </div>
                {loading ? <Loading /> : (
                    league ? (
                        <div>
                            <h1 style={{ marginBottom: '2rem' }}>{league.name} League</h1>
                            <LeagueDetails league={league} />
                            <h1>Registration: <small className='text-muted'>OPEN</small></h1>
                            <RegisterButton leagueId={league.id} />
                            <p style={{ marginTop: '1rem' }}>
                                <strong>Note:</strong> Only captains of teams with 5 or more players are able to register for leagues.
                            </p>
                            <h2 style={{ marginTop: '2rem' }}>Divisions</h2>
                            <Divisions divisionSet={league.divisionSet} />
                            <h2 style={{ marginTop: '2rem' }}>Seasons</h2>
                            <Seasons seasonSet={league.seasonSet} />
                        </div>
                    ) : (
                        <div>
                            <h1>404: Not Found</h1>
                        </div>
                    )
                )}
            </Container>
        )
    }
}

const query = gql`
query ($id: UUID!) {
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
      divisionseasonSet {
        id
        startDate
        endDate
        division {
          id
          name
          number
        }
        seriesSet {
          id
          startDate
          endDate
          teamA {
            id
            name
          }
          teamB {
            id
            name
          }
        }
      }
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
