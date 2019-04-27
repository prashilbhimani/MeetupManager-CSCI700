import React, { Component } from 'react'
import GroupInfocard from "./GroupInfocard/GroupInfocard";
import SimpleChart from '../../../SimpleChart/SimpleChart';
import MaterialTable from 'material-table'
import { connect } from 'react-redux';
import { styles } from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { fetchGroupInfo } from "../../../../actions/groupActions";

class GroupPage extends Component {

  constructor() {
    super()
    this.state = {
      intervalTimer : null
    }
  }
  componentDidMount() {
    const { match } = this.props;
    const { groupId} = match.params         
    this.props.fetchGroupInfo(groupId);
    var interval = setInterval(() => {
      this.props.fetchGroupInfo(groupId);
    }, 5000);
    this.setState({intervalTimer: interval})
  }
  componentWillUnmount() {
    if(this.state.intervalTimer) {
      clearInterval(this.state.intervalTimer);
    }
  }

  _convertEpochToSpecificTimezone = (utcSeconds) => {        
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

  _formatEventsTableData = (data) => {
    var new_data = []
    data.map(bigobj => {
      const event = bigobj.event
      var myjson = {}    
      myjson["event_id"] = event.event_id;
      myjson["event_name"] = event.event_name;
      myjson["time"] = this._convertEpochToSpecificTimezone(event.time) 
      myjson["event_url"] = event.event_url
      new_data.push(myjson)
    })    
    return new_data
  }

   _isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  
  _formatBucketData = (data) => {
    var new_data = []    

    var sortedDates = []
    Object.keys(data).map(function(key, index) {
      if(key !== "total_count")
        sortedDates.push(parseInt(key))
    });
    sortedDates.sort(this.sortNumber)
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

  sortNumber = (a,b) => {
    return a - b;
  }
  render() {  
    const { myGroupInfo } = this.props;              
    const groupData = this._isEmpty(myGroupInfo) ? undefined : <GroupInfocard groupDetails={myGroupInfo[0].event.groupDetails}/>

    const formattedEventsTableData = this._isEmpty(myGroupInfo) ? undefined : this._formatEventsTableData(myGroupInfo);
    // const rsvpDateData = this.props.myrsvpCounts ? this._formatRSVPDateData(this.props.myrsvpCounts) : []    

    // const rsvBucketData = this.props.myrsvpBuckets ? this._formatBucketData(this.props.myrsvpBuckets) : []
    
    // const formattedRSVPData = this.props.myrsvps ? this._formatRSVPData(this.props.myrsvps): [];
    return (       
        <div>                
          {groupData}
          <br/>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
            tableRef={this.tableRef}
              columns={[
                { title: 'ID', field: 'event_id' },
                { title: 'Name', field: 'event_name' },
                { title: 'Time', field: 'time' }, 
                { title: 'Event URL', field: 'event_url' }, 

              ]}
              data={formattedEventsTableData ? formattedEventsTableData : []}
              title="Detail Panel With RowClick Preview"
        />
        </div>

          {/*<SimpleChart title={'Daily Count'} subtitle={'Subtitle1'} data={rsvpDateData}/>
          <br/>
          <SimpleChart title={'Bucket Count'} subtitle={'Subtitle2'} data={rsvBucketData}/>
          <br/> */}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  myGroupInfo: state.groupReducer.myGroupInfo, 
});

const mapDispatchToProps = {
  fetchGroupInfo: fetchGroupInfo,   
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GroupPage));
