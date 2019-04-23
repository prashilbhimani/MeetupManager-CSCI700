import React, { Component } from 'react'
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import SimpleCard from "./SimpleCard/SimpleCard";
import { Route } from "react-router-dom";
import EventsPage from "../../../MeetupAPI/EventsPage/EventsPage";

class EventLandingPage extends Component {
    render() {
        const { classes, match } = this.props;       
        return (      
              <div className={classes.contentWrapper}>                                                 
                    <SimpleCard match={match}/>                                  
                    <Route path="/eventsapi/eventinfo/1231234324" render={(props) => (<EventsPage {...props} />)} />                                                
              </div>          
        );
      }
}
export default withStyles(styles)(EventLandingPage);
