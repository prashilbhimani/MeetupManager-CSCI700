import React, { Component } from 'react'
import Chart from "react-google-charts"
import Paper from "@material-ui/core/Paper";;

class SimpleChart extends Component {
  render() {
    console.log(`in SimpleChart: ${JSON.stringify(this.props.data)}`)
    return (
      <Paper>
          <Chart
            width={'900px'}
            height={'400px'}
            chartType="Line"
            loader={<h6>Fetching data</h6>}
            data={this.props.data ? this.props.data : []}
            options={{
              // Material design options
              chart: {
                title: `Daily Counts`,
                subtitle: 'The RSVP chart that shows when users RSVP to the',
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '2' }}
          />          
      </Paper>
    )
  }
}

export default  SimpleChart;
