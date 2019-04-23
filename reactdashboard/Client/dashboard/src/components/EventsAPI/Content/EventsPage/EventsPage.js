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
      totalCount : 0
    }
  }

  componentDidMount() {
    const { match } = this.props;
    const { eventId} = match.params         
    this.props.fetchRsvpCount(eventId);
    console.log(`mount: ${JSON.stringify(this.props)}`)
    if(this.props.myrsvpCounts) {
      console.log(`entering in did mount`)
      this.setState({
        totalCount: this.props.myrsvpCounts.total_count
      })
    }

    // setInterval(() => {
    //   this.props.fetchRsvpCount(eventId);
    // }, 5000);
  }

  // componentDidUpdate(nextProps) {
  //   // console.log(`did update ${JSON.stringify(this.props.myrsvpCounts)}`)
  //   console.log(`nextProps: ${JSON.stringify(nextProps)}`)
  //   if(nextProps.myrsvpCounts !== undefined && this.props.myrsvpCounts.total_count !== nextProps.myrsvpCounts.total_count) {
  //     console.log(` yeah props changed`)
  //     this.setState ({        
  //       totalCount: nextProps.myrsvpCounts.total_count
  //     })
  //   }
  // }

  render() {  
    const { match, myrsvpCounts } = this.props;
    const { url, eventId} = match
    console.log(` in EventsPage Render: ${this.state.totalCount}`)      
     
    return (       
        <div>
          <RSVPCountCard totalCount={this.state.totalCount}/> 
          <br/>
          <SimpleChart/>
          <br/>
          <SimpleChart/>
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
