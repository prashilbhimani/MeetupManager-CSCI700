import React, { Component } from 'react'
import SimpleCard from "./SimpleCard/SimpleCard";
import SimpleChart from './SimpleChart/SimpleChart';


export default class EventsPage extends Component {
  componentDidMount() {
    setInterval(() => {
      console.log('timeout called')
    }, 100);
}
  render() {        
    return (       
        <div>
          <SimpleCard/> 
          <br/>
          <SimpleChart/>
          <br/>
          <SimpleChart/>
        </div>
    )
  }
}
