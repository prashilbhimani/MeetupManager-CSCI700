import React, { Component } from 'react'
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import SimpleCard from "./SimpleCard/SimpleCard";


class EventLandingPage extends Component {
    render() {
        const { classes, match } = this.props;       
        return (      
              <div className={classes.contentWrapper}>             
                  <div>                    
                    <SimpleCard/>                
                  </div>            
              </div>          
        );
      }
}
export default withStyles(styles)(EventLandingPage);
