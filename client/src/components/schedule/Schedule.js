import React, { Component } from 'react'
import styled from 'styled-components'
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { createUrl } from '../../api/utils'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'



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
       <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Week 1</Button>
       <Collapse isOpen={this.state.collapse}>
         <Card>
           <CardBody>
           Anim pariatur cliche reprehenderit,
            enim eiusmod high life accusamus terry richardson ad squid. Nihil
            anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident.
           </CardBody>
         </Card>
       </Collapse>
     </div>
   );
  }
}


const query= gql`query { allMatches }`
export default Schedule;
