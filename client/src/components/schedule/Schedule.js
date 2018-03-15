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

  // const matchItem = allMatches.map((match) => {
  //     //return matchDetail =
  // });

  render(){
    return (

       <div>
       <ScheduleStyle>
       </ScheduleStyle>
         <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem', cursor: 'pointer' }}>Week 1</Button>
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
               <tbody>
                 <tr>
                   <th scope="row">1</th>
                   <td>A TEAM</td>
                   <td>B TEAM</td>
                   <td>2:1</td>
                 </tr>
               </tbody>
             </Table>
             </CardBody>
           </Card>
         </Collapse>
       </div>

   );
  }
}


const query= gql`query { allMatches }`
export default Schedule;
