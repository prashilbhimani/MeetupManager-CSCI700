import React, { Component } from 'react'
import Chart from "react-google-charts"
import Paper from "@material-ui/core/Paper";;

class SimpleChart extends Component {
  render() {    
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
                title: `${this.props.title}`,
                subtitle: `${this.props.subtitle}`,
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
