import React, { Component } from 'react'
import RSVPCountCard from "./RSVPCountCard/RSVPCountCard";
import SimpleChart from './SimpleChart/SimpleChart';
import MaterialTable from 'material-table'
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { fetchRsvpCount, fetchBuckets, fetchRsvps } from "../../../../actions/eventActions";

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
      this.props.fetchBuckets(eventId);
      this.props.fetchRsvps(eventId)
    }, 5000);
    this.setState({intervalTimer: interval})
  }
  componentWillUnmount() {
    if(this.state.intervalTimer) {
      clearInterval(this.state.intervalTimer);
    }
  }

  convertEpochToSpecificTimezone = (utcSeconds) => {        
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

  _formatRSVPDateData = (data) => {
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

  _formatBucketData = (data) => {    
    var new_data = []
    if(data) {
      var dateSlots = []
      Object.keys(data).map(function(key, index) {        
        dateSlots.push(key)
      });
      dateSlots.sort()
      for(var i=0; i< dateSlots.length; i++) {
        var key = dateSlots[i]      
        var value = data[`${key}`]
        var subarr = [`${key}`, value]
        new_data.push(subarr)    
      }      
    }
    new_data.unshift(["Hour Slots", "RSVPs"])        
    return new_data
  }

  _formatRSVPData = (data) => {
    var new_data = []
    data.map(rsvp => {      
      var myjson = {}
      myjson["photo"] = rsvp.json.member.photo
      myjson["member_name"] = rsvp.json.member.member_name;            
      myjson["member_id"] = rsvp.json.member.member_id;
      new_data.push(myjson)
    })
    return new_data
  }
  render() {  
    const { myrsvpCounts } = this.props;        
    
    const rsvpCounter = this.props.myrsvpCounts ? <RSVPCountCard totalCount={myrsvpCounts.total_count}/> : null

    const rsvpDateData = this.props.myrsvpCounts ? this._formatRSVPDateData(this.props.myrsvpCounts) : []    

    const rsvBucketData = this.props.myrsvpBuckets ? this._formatBucketData(this.props.myrsvpBuckets) : []
    
    const formattedRSVPData = this.props.myrsvps ? this._formatRSVPData(this.props.myrsvps): [];
    return (       
        <div>
          {rsvpCounter}
          <br/>
          <SimpleChart title={'Daily Count'} subtitle={'Subtitle1'} data={rsvpDateData}/>
          <br/>
          <SimpleChart title={'Bucket Count'} subtitle={'Subtitle2'} data={rsvBucketData}/>
          <br/>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
            tableRef={this.tableRef}
              columns={[
                { title: 'Avatar', field: 'avatar', render: rowData => (
                    <img
                    style={{ height: 36, borderRadius: '50%', width: 36 }}
                    src={rowData.photo}
                    alt="Avatar"
                  />
                ) },
                { title: 'Name', field: 'member_name' },
                { title: 'Id', field: 'member_id' },                
              ]}
              data={formattedRSVPData ? formattedRSVPData : []}
              title="Detail Panel With RowClick Preview"          
        />
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  myrsvpCounts: state.eventsReducer.myrsvpCounts, 
  myrsvpBuckets: state.eventsReducer.myrsvpBuckets, 
  myrsvps: state.eventsReducer.myrsvps
});

const mapDispatchToProps = {
  fetchRsvpCount: fetchRsvpCount, 
  fetchBuckets: fetchBuckets,
  fetchRsvps: fetchRsvps    
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventsPage));
