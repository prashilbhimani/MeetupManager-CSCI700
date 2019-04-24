import React, { Component } from 'react'
import RSVPCountCard from "./RSVPCountCard/RSVPCountCard";
import SimpleChart from './SimpleChart/SimpleChart';
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { fetchRsvpCount } from "../../../../actions/eventActions";

class EventsPage extends Component {

  componentDidMount() {
    const { match } = this.props;
    const { eventId} = match.params         
    this.props.fetchRsvpCount(eventId);
    setInterval(() => {
      this.props.fetchRsvpCount(eventId);
    }, 5000);
  }

  // convertEpochToSpecificTimezone = (offset) => {
  //   var d = new Date(1495159447834);
  //   var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
  //   var nd = new Date(utc + (3600000*offset));
  //   return nd.toLocaleString();
  // }

  _formatData = (data) => {
    var new_data = []    
    new_data.push(["Date", "RSVPs"])
    var sortedDates = []
    Object.keys(data).map(function(key, index) {
      if(key !== "total_count")
        sortedDates.push(key)
    });
    sortedDates.sort()
    for(var i=0; i< sortedDates.length; i++) {
      var key = sortedDates[i]      
      var value = data[`${key}`]
      var subarr = [`${value[`start_time`]}`, value[`count`]]
      new_data.push(subarr)    
    }
    console.log(`sortedDates: ${sortedDates}`)
    return new_data;
  }

  render() {  
    const { myrsvpCounts } = this.props;        
    
    const rsvpCounter = this.props.myrsvpCounts ? <RSVPCountCard totalCount={myrsvpCounts.total_count}/> : null

    const data = this.props.myrsvpCounts ? this._formatData(this.props.myrsvpCounts) : []    

    console.log(`sorted Data is: ${data}`)
    return (       
        <div>
          {rsvpCounter}
          <br/>
          <SimpleChart data={data}/>
          <br/>
          {/* <SimpleChart /> */}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  myrsvpCounts: state.eventsReducer.rsvpCounts,  
});

const mapDispatchToProps = {
  fetchRsvpCount: fetchRsvpCount,   
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventsPage));
