import React, { Component } from 'react'
import Chart from "react-google-charts"
import Paper from "@material-ui/core/Paper";;

class SimpleChart extends Component {
  render() { 
    // console.log(`haxis: ${this.props.hAxis} vaxis: ${this.props.vAxis} , title:${this.props.title}, subtitle:${this.props.subtitle}`)   
    console.log(`data for charts is:`)
    console.log(this.props.data)
    return (
      <Paper>
          <Chart
            width={'900px'}
            height={'400px'}
            chartType="LineChart"
            loader={<h6>Fetching data</h6>}
            data={this.props.data && this.props.data.length > 1 ? this.props.data : []}
            options={{
              // Material design options              
              title: this.props.title,              
              hAxis: {
                title: `${this.props.hAxis}`,
              },
              vAxis: {
                title: `${this.props.vAxis}`,
              },
              series: {
                1: { curveType: 'function' },
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
          />          
      </Paper>
    )
  }
}

export default  SimpleChart;
