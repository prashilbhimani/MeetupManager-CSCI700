
import React, { Component } from "react";
import {    
  Grid,
  Col,
  Table
} from "react-bootstrap";
import { thArray } from "variables/Variables.jsx";
import { Card } from "../creative-tim-components/Card/Card.jsx";
import { fetchEvents, modifyEvents } from "../../actions/eventActions";
import { connect } from 'react-redux';

class ListEvents extends Component {
  
  componentDidMount() {    
    this.props.fetchEvents();    
  }

  componentWillReceiveProps(nextProps) {        
    if(nextProps.newEvent) {
      this.props.myevents.unshift(nextProps.newEvent);
    }
  }

  _onLinkClickHandler = (type, normalized_name) => {
    this.props.modifyEvents(type,normalized_name);
  }
    render() {      
      const eventItems = this.props.myevents;                
      const eventsTable = eventItems.map(event => {        
        let keywords = "";
        event.keywords.map(kw => {
          keywords += kw + ","
          return keywords
        });
        keywords = keywords.replace(/,\s*$/, "");        
        return (
          <tr key={event.normalized_name}>
          <td>{event.name}</td>
            <td>{event.description}</td>
            <td>{keywords}</td>
            <td>{event.status}</td>
            <td><a href="#" onClick={() => {this._onLinkClickHandler("start", event.normalized_name)}}><i id={"start-"+event.normalized_name} className="pe-7s-play" /></a></td>
            <td><a href="#" onClick={() => {this._onLinkClickHandler("pause", event.normalized_name)}}><i id={"pause-"+event.normalized_name} className="pe-7s-refresh" /></a></td>            
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


export default connect(mapStateToProps, { fetchEvents: fetchEvents, modifyEvents: modifyEvents })(ListEvents);