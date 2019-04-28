import React, { Component } from "react";
import Header from "../common-components/Header/Header";
import { Route} from "react-router-dom";
import GroupLandingPage from "./Content/GroupLandingPage/GroupLandingPage"
import GroupPage from "./Content/GroupsPage/GroupPage"
export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});

class GroupAPI extends Component {
  render() { 
    const { classes } = this.props;       
    const title = "Group API";  
       
    return (
      
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} />
        <div className={classes.Main}>
          <main className={classes.mainContent}>                    
              <Route exact path="/groupapi" render={(props) => (<GroupLandingPage {...props} />)} />                            
              <Route path="/groupapi/groupinfo/:groupId" render={(props) => (<GroupPage {...props} />)} />                                                
          </main>
        </div>
      </div>
    );
  }
}

export default GroupAPI;
