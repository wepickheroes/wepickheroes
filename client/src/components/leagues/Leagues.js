import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import { Link } from 'react-router-dom'
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
} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
    faChevronCircleRight,
} from '@fortawesome/fontawesome-free-solid'
import { Loading } from '../utils'

const League = props => {
    const {
        id,
        name,
        description,
        numSeriesPerSeason,
        numGamesPerSeries,
        seasonSet,
        divisionSet,
        ...otherProps,
    } = props
    const nextSeason = seasonSet.length > 0 && [...seasonSet].splice(-1)[0]
    return (
        <Card {...otherProps}>
            <CardBody>
                <CardTitle>
                    <Link to={`/leagues/${id}`}>
                        {name}
                    </Link>
                </CardTitle>
                <CardText>
                    {description}
                </CardText>
                <ul>
                    <li>
                        <strong>{divisionSet.length}</strong> divisions
                    </li>
                    <li>
                        <strong>{numSeriesPerSeason}</strong> best of{' '}
                        <strong>{numGamesPerSeries}</strong> series per season
                    </li>
                    {nextSeason && (
                        <li>
                            Next season: <strong>{nextSeason.number}</strong>{' '}
                            ({moment(nextSeason.startDate).format('L')})
                        </li>
                    )}
                    <li>
                        Registration: <strong>Open</strong>
                    </li>
                </ul>

                <div className='text-center'>
                    <LinkContainer to={`/leagues/${id}`}>
                        <Button color='primary'>
                            View Details&nbsp;
                            <FontAwesomeIcon icon={faChevronCircleRight} />
                        </Button>
                    </LinkContainer>
                </div>
            </CardBody>
        </Card>
    )
}

class Leagues extends Component {
    render() {
        const {
            data: {
                loading, allLeagues,
            }
        } = this.props
        return (
            <Container>
                <h1>Leagues</h1>
                <Row>
                    {loading ? <Loading /> : allLeagues.map((league, i) => (
                        <Col key={`league-${league.id}`} lg={i >= 2 ? 4 : 6} md={6} xs={12} sm={12}>
                            <League {...league} style={{ marginTop: '2rem' }} />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

const query = gql`query {
    allLeagues {
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
        }
    }
}
`

Leagues = graphql(query)(Leagues)

export default Leagues
