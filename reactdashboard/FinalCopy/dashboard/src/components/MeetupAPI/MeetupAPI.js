import React, { Component } from "react";
import Header from "../common-components/Header/Header";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Content from "./Content/Content";


export const styles = theme => ({
  Main: {
    minHeight: '100%',
    display:"block",
  },
});

class EventsAPI extends Component {
  constructor(props) {
      super(props);
      this.state = {
        tabValue: "events-page"
      }
  }

  onTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  headerTabs = () => {
    return (
      <Tabs value={this.state.tabValue} onChange={this.onTabChange} textColor="inherit">                         
        <Tab textColor="inherit" label="Events Page" value="events-page" />                                          
      </Tabs>  
    )
  }

  render() { 
    const { classes } = this.props;   
    const title = "Events Page";  
    return (
      <div>
        <Header onDrawerToggle={this.props.onDrawerToggle} title={title} />
        <div className={classes.Main}>
          <main className={classes.mainContent}>            
            <Content tabValue={this.state.tabValue} onTabChange={this.onTabChange}/>
          </main>
        </div>
      </div>
    );
  }
}

export default EventsAPI;
