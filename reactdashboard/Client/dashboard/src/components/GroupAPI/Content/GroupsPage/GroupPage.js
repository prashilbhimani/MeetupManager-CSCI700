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
      intervalTimer : null,
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
      return myjson
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
                     
    var chartData = {
      0: [0],
      1: [1],
      2: [2],
      3: [3],
      4: [4],
      5: [5],
      6: [6],
      7: [7],
      8: [8],
      9: [9],
      10: [10],
      11: [11],
      12: [12],
      13: [13],
      14: [14],
      15: [15],
      16: [16],
      17: [17],
      18: [18],
      19: [19],
      20: [20],
      21: [21],
      22: [22],
      23: [23],
    }
    var eventNames = [`x`]

    for(var i=0 ; i< data.length; i++) { // for each event
      const event = data[i].event;
      const eventName = event.event_name;
      const dailyCounts = event.dailyCounts            

      Object.keys(dailyCounts).map(function(key, index) { // for each bucket of the event                                       
        if(chartData[key] !== undefined) {          
          chartData[key].push(dailyCounts[key])          
        }   
        return chartData             
      })

      eventNames.push(eventName)
    }
    
    var new_data = []
    new_data.push(eventNames)
    for(i=0; i< 24; i++) {
      new_data.push(chartData[i])
    }
    return new_data
}

  sortNumber = (a,b) => {
    return a - b;
  }
  render() {  
    const { myGroupInfo } = this.props;                 
    const groupData = this._isEmpty(myGroupInfo) ? undefined : <GroupInfocard groupDetails={myGroupInfo[0].event.groupDetails}/>

    const formattedEventsTableData = this._isEmpty(myGroupInfo) ? undefined : this._formatEventsTableData(myGroupInfo);        
    const formattedChartData = this._isEmpty(myGroupInfo) ? [] : this._formatBucketData(myGroupInfo);                    
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
              title="Event infomation"
        />
        </div>

        <SimpleChart title={'Bucket Count'} subtitle={'Subtitle1'} data={formattedChartData} hAxis={`Buckets`} vAxis={`RSVPs`}/>
          <br/>                    
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
