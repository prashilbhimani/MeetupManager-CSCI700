import React, { Component } from 'react'
import UserTickerCard from "./UserTickerCard/UserTickerCard"
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
export default class EventsPage extends Component {
  render() {        
    return (      
          <Card>
            <Typography gutterBottom variant="h5" component="h2"> Live RSVP counter </Typography>
            <Typography gutterBottom variant="subheading" component="h2"> Some dummy value </Typography>
          </Card>      
    )
  }
}
