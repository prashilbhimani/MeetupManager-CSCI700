import React, { Component } from 'react'
import RSVPCountCard from "./RSVPCountCard/RSVPCountCard";
import SimpleChart from './SimpleChart/SimpleChart';
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { fetchRsvpCount } from "../../../../actions/eventActions";

class EventsPage extends Component {

  constructor() {
    super()
    this.state = {
      intervalTimer : null
    }
  }
  componentDidMount() {
    const { match } = this.props;
    const { eventId} = match.params         
    this.props.fetchRsvpCount(eventId);
    var interval =setInterval(() => {
      this.props.fetchRsvpCount(eventId);
    }, 5000);
    this.setState({intervalTimer: interval})
  }
  componentWillUnmount() {
    if(this.state.intervalTimer) {
      clearInterval(this.state.intervalTimer);
    }
  }

  convertEpochToSpecificTimezone = (utcSeconds) => {    
    console.log(`utc seconds: ${utcSeconds}`)
    var d = new Date(utcSeconds); // The 0 there is the key, which sets the date to the epoch        
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var format = `${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`
    return format;
  }

  _formatData = (data) => {
    var new_data = []    

    var sortedDates = []
    Object.keys(data).map(function(key, index) {
      if(key !== "total_count")
        sortedDates.push(key)
    });
    sortedDates.sort()
    for(var i=0; i< sortedDates.length; i++) {
      var key = sortedDates[i]      
      var value = data[`${key}`]
      var date = this.convertEpochToSpecificTimezone(value[`start_time`])    
      var subarr = [`${date}`, value[`count`]]
      new_data.push(subarr)    
    }

    new_data.unshift(["Date", "RSVPs"])    
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
