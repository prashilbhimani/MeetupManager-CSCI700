import React, { Component } from 'react'
import RSVPCountCard from "./RSVPCountCard/RSVPCountCard";
import SimpleChart from './SimpleChart/SimpleChart';


export default class EventsPage extends Component {
  componentDidMount() {
    setInterval(() => {
      // here call a bunch of actions to populate stuff.
    }, 3000);
}
  render() {  
    const { match } = this.props;
    const { url, eventId} = match    
    return (       
        <div>
          <RSVPCountCard/> 
          <br/>
          <SimpleChart/>
          <br/>
          <SimpleChart/>
        </div>
    )
  }
}
