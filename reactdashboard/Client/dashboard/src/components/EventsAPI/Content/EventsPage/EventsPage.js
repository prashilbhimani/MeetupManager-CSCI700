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


  render() {  
    const { myrsvpCounts } = this.props;    
    if(myrsvpCounts) {
      console.log(` in EventsPage Render: ${myrsvpCounts.total_count}`)      
    }
    
     const rsvpCounter = this.props.myrsvpCounts ? <RSVPCountCard totalCount={myrsvpCounts.total_count}/> : null
    return (       
        <div>
          {rsvpCounter}
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
