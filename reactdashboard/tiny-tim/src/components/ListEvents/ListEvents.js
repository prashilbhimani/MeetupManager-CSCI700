
import React, { Component } from "react";
import {    
  Grid,
  Col,
  Table
} from "react-bootstrap";
import { thArray } from "variables/Variables.jsx";
import { Card } from "../creative-tim-components/Card/Card.jsx";
import { fetchEvents } from "../../actions/eventActions";
import { connect } from 'react-redux';

class ListEvents extends Component {
  
  componentDidMount() {    
    this.props.fetchEvents();    
  }

  componentWillReceiveProps(nextProps) {    
    if(nextProps.newEvent) {
      // console.log(this.props.myevents);          
      // console.log('unshifting stuff')
      this.props.myevents.unshift(nextProps.newEvent);
      // console.log(this.props.myevents);
    }
  }

    render() {
      const eventItems = this.props.myevents;                  
      const eventsTable = eventItems.map(event => {
        let keywords = "";
        event.keywords.map(kw => {
          keywords += kw + ","
        });
        keywords = keywords.replace(/,\s*$/, "");        
        return (
          <tr key={event.event_name}>
          <td>{event.event_name}</td>
            <td>{event.description}</td>
            <td>{keywords}</td>
            <td>{event.status}</td>
            <td key={"start-"+event.event_name}><i className="pe-7s-play" /></td>
            <td key={"pause-"+event.event_name}><i className="pe-7s-refresh" /></td>            
          </tr>
        )
      });      
        return (
            <Grid fluid>
            <Col md={12}>
                  <Card
                    title="Previously Collected Events"
                    category="All the previous events that were collected for our use."
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      <Table striped hover>
                        <thead>
                          <tr>
                            {thArray.map((prop, key) => {
                              return <th key={key}>{prop}</th>;
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {
                            eventsTable                      
                          }
                        </tbody>
                      </Table>
                    }
                  />
                </Col>
          </Grid>
        );
    }
}

const mapStateToProps = state => ({
  myevents: state.eventsReducer.myevents,
  newEvent: state.eventsReducer.newEvent    
});

export default connect(mapStateToProps, { fetchEvents })(ListEvents);