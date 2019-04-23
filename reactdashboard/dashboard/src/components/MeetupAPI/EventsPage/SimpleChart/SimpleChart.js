import React, { Component } from 'react'
import Chart from "react-google-charts"
import Paper from "@material-ui/core/Paper";;

class SimpleChart extends Component {
// https://react-google-charts.com/bar-chart
  render() {
    return (
      <Paper>
          <Chart
            width={'900px'}
            height={'400px'}
            chartType="Bar"
            loader={<div>Loading data</div>}
            data={[
              ['Hour', 'RSVP Count'],
              ['0', 1000],
              ['1', 1170],
              ['2', 660],
              ['3', 1030],
            ]}
            options={{
              // Material design options
              chart: {
                title: 'Daily Counts',
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
