
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

  _onLinkClickHandler = (e) => {
    e.preventDefault();
    console.log('in onLinkClick Handler');
    console.log(e.target.id);
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
            <td><a href="#" onClick={this._onLinkClickHandler}><i id={"start-"+event.normalized_name} className="pe-7s-play" /></a></td>
            <td><a href="#" onClick={this._onLinkClickHandler}><i id={"pause-"+event.normalized_name} className="pe-7s-refresh" /></a></td>            
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