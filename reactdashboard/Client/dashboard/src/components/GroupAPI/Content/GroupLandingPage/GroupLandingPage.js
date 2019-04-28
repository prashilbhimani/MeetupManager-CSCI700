import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import SimpleCard from "./SimpleCard/SimpleCard";
import { Route } from "react-router-dom";
import GroupPage from "../GroupsPage/GroupPage";

class GroupLandingPage extends Component {
    render() {
        const { classes, match } = this.props;       
        return (      
              <div className={classes.contentWrapper}>                                                 
                    <SimpleCard match={match}/>                                  
                    <Route path="/groupapi/groupinfo/:groupId" render={(props) => (<GroupPage {...props} />)} />                                                
              </div>          
        );
      }
}
export default withStyles(styles)(GroupLandingPage);
