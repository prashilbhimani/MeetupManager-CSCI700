import React, { Component } from "react";
import Header from "../common-components/Header/Header";
import { Route} from "react-router-dom";
import EventLandingPage from "./Content/EventLandingPage/EventLandingPage";
import EventsPage from "../EventsAPI/Content/EventsPage/EventsPage";

export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});

class EventsAPI extends Component {
  render() { 
    const { classes } = this.props;       
    const title = "Events Collection";  
       
    return (
      
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} />
        <div className={classes.Main}>
          <main className={classes.mainContent}>                    
              <Route exact path="/eventsapi" render={(props) => (<EventLandingPage {...props} />)} />                            
              <Route path="/eventsapi/eventinfo/:eventId" render={(props) => (<EventsPage {...props} />)} />                                                
          </main>
        </div>
      </div>
    );
  }
}

export default EventsAPI;
