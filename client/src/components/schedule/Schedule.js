import React, { Component } from 'react'
import styled from 'styled-components'
import { Collapse, Button, CardBody, Card, Table } from 'reactstrap';
import { createUrl } from '../../api/utils'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const ScheduleStyle = styled.div`
    margin: 50px auto auto auto;
`


class Schedule extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
  this.setState({ collapse: !this.state.collapse });
  }

  const { data: { loading, allMatches, allLeagueSeries, allLeagueSeason }} = this.props


  render(){
    return (

       <div>
       <ScheduleStyle>
       </ScheduleStyle>
        {allLeagueSeries.map((series) =>(

            <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', cursor: 'pointer' }}>
            {series.start_date}
            </Button>
              <Collapse isOpen={this.state.collapse}>

                  <Card>
                    <CardBody>
                    <Table>
                      <thead>
                        <tr>
                          <th>Match #</th>
                          <th>Team A</th>
                          <th>Team B</th>
                          <th>Score</th>
                        </tr>
                      </thead>

                      {allLeagueSeries.map((match, idx) => (
                        <tbody>
                          <tr>
                            <th scope="row">{idx}</th>
                            <td>{match.team_a}</td>
                            <td>{match.team_b}</td>
                            <td>{ // Match Scores, probably should be ternary?
                              0:0
                            }
                              </td>
                          </tr>
                        </tbody>

                      ))}
                </Table>
                </CardBody>
              </Card>
              </Collapse>
        ))}
       </div>

   );
  }
}


const query= gql`query { allMatches, allLeagueSeries, allLeagueSeason }`
export default Schedule;
