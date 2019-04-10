import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { TablePaginationActionsWrapped } from "../../../common-components/TablePaginationActions/TablePaginationActions";
import { styles } from "./styles";
import { connect } from 'react-redux';
import { fetchEvents, modifyEvents } from "../../../../actions/eventActions";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import { ResponsiveBar } from '@nivo/bar'




class CustomPaginationActionsTable extends React.Component {
  componentDidMount() {    
    this.props.fetchEvents();    
  }

  componentWillReceiveProps(nextProps) {        
    if(nextProps.newEvent) {
      this.props.myevents.unshift(nextProps.newEvent);
    }
  }

  _onLinkClickHandler = (status, normalized_name) => {
    this.props.modifyEvents(status, normalized_name);
    let events = [...this.state.rows];
    events.find((o, i) => {     
      if (o.normalized_name === normalized_name) {
          events[i].status = status
          return true; // stop searching
      }
      return false;
    });
    this.setState({rows: events})
  }
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 50,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;    
    const thArray = ["Event Name", "Description", "Status", "Start/Pause"];
    const rows = this.props.myevents;
    const tablecontents = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
      // let keywords = "";
      // row.keywords.map(kw => {
      //   keywords += kw + ","
      //   return keywords
      // });
      // keywords = keywords.replace(/,\s*$/, "");
      const button = row.status === "ACTIVE" ?  
      <a  href="# " onClick={(e) => {e.preventDefault();this._onLinkClickHandler("NOT_ACTIVE", row.normalized_name)}}><Pause className={classes.icon} id={"pause-"+row.normalized_name}/></a>
      :
      <a  href="# " onClick={(e) => {e.preventDefault();this._onLinkClickHandler("ACTIVE", row.normalized_name)}}><PlayArrow className={classes.icon} id={"start-"+row.normalized_name}/></a> 
      return (
        <TableRow key={row.normalized_name}>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.description}</TableCell>
          {/* <TableCell align="left">{keywords}</TableCell> */}
          <TableCell align="left">{row.status}</TableCell>
          <TableCell align="left">{button}</TableCell>
        </TableRow>
    )}      
    )
    var data=[
      {
        "country": "AD",
        "hot dog": 18,
        "hot dogColor": "hsl(43, 70%, 50%)",
        "burger": 20,
        "burgerColor": "hsl(239, 70%, 50%)",
        "sandwich": 125,
        "sandwichColor": "hsl(179, 70%, 50%)",
        "kebab": 22,
        "kebabColor": "hsl(251, 70%, 50%)",
        "fries": 11,
        "friesColor": "hsl(291, 70%, 50%)",
        "donut": 129,
        "donutColor": "hsl(328, 70%, 50%)"
      },
      {
        "country": "AE",
        "hot dog": 146,
        "hot dogColor": "hsl(320, 70%, 50%)",
        "burger": 54,
        "burgerColor": "hsl(151, 70%, 50%)",
        "sandwich": 144,
        "sandwichColor": "hsl(26, 70%, 50%)",
        "kebab": 47,
        "kebabColor": "hsl(158, 70%, 50%)",
        "fries": 85,
        "friesColor": "hsl(189, 70%, 50%)",
        "donut": 145,
        "donutColor": "hsl(324, 70%, 50%)"
      },
      {
        "country": "AF",
        "hot dog": 109,
        "hot dogColor": "hsl(80, 70%, 50%)",
        "burger": 197,
        "burgerColor": "hsl(235, 70%, 50%)",
        "sandwich": 37,
        "sandwichColor": "hsl(147, 70%, 50%)",
        "kebab": 121,
        "kebabColor": "hsl(270, 70%, 50%)",
        "fries": 188,
        "friesColor": "hsl(332, 70%, 50%)",
        "donut": 69,
        "donutColor": "hsl(166, 70%, 50%)"
      },
      {
        "country": "AG",
        "hot dog": 80,
        "hot dogColor": "hsl(130, 70%, 50%)",
        "burger": 111,
        "burgerColor": "hsl(51, 70%, 50%)",
        "sandwich": 60,
        "sandwichColor": "hsl(136, 70%, 50%)",
        "kebab": 167,
        "kebabColor": "hsl(81, 70%, 50%)",
        "fries": 32,
        "friesColor": "hsl(193, 70%, 50%)",
        "donut": 121,
        "donutColor": "hsl(66, 70%, 50%)"
      },
      {
        "country": "AI",
        "hot dog": 117,
        "hot dogColor": "hsl(219, 70%, 50%)",
        "burger": 50,
        "burgerColor": "hsl(299, 70%, 50%)",
        "sandwich": 6,
        "sandwichColor": "hsl(168, 70%, 50%)",
        "kebab": 190,
        "kebabColor": "hsl(239, 70%, 50%)",
        "fries": 176,
        "friesColor": "hsl(44, 70%, 50%)",
        "donut": 141,
        "donutColor": "hsl(191, 70%, 50%)"
      },
      {
        "country": "AL",
        "hot dog": 87,
        "hot dogColor": "hsl(21, 70%, 50%)",
        "burger": 194,
        "burgerColor": "hsl(117, 70%, 50%)",
        "sandwich": 4,
        "sandwichColor": "hsl(156, 70%, 50%)",
        "kebab": 177,
        "kebabColor": "hsl(33, 70%, 50%)",
        "fries": 27,
        "friesColor": "hsl(20, 70%, 50%)",
        "donut": 152,
        "donutColor": "hsl(293, 70%, 50%)"
      },
      {
        "country": "AM",
        "hot dog": 82,
        "hot dogColor": "hsl(165, 70%, 50%)",
        "burger": 80,
        "burgerColor": "hsl(128, 70%, 50%)",
        "sandwich": 89,
        "sandwichColor": "hsl(327, 70%, 50%)",
        "kebab": 0,
        "kebabColor": "hsl(213, 70%, 50%)",
        "fries": 16,
        "friesColor": "hsl(75, 70%, 50%)",
        "donut": 0,
        "donutColor": "hsl(168, 70%, 50%)"
      }
    ]
    return (
      <Paper className={classes.root}>
        <div className={classes.barWrapper}>
        <ResponsiveBar
        data={data}
        keys={[
            "hot dog",
            "burger",
            "sandwich",
            "kebab",
            "fries",
            "donut"
        ]}
        indexBy="country"
        margin={{
            "top": 50,
            "right": 130,
            "bottom": 50,
            "left": 60
        }}
        padding={0.45}
        colors="nivo"
        colorBy="id"
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "#38bcb2",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "#eed312",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[
            {
                "match": {
                    "id": "fries"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "sandwich"
                },
                "id": "lines"
            }
        ]}
        borderColor="inherit:darker(1.6)"
        
        
        axisBottom={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "country",
            "legendPosition": "middle",
            "legendOffset": 32
        }}
        axisLeft={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "food",
            "legendPosition": "middle",
            "legendOffset": -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "dataFrom": "keys",
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 120,
                "translateY": 0,
                "itemsSpacing": 2,
                "itemWidth": 100,
                "itemHeight": 20,
                "itemDirection": "left-to-right",
                "itemOpacity": 0.85,
                "symbolSize": 20,
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemOpacity": 1
                        }
                    }
                ]
            }
        ]}
    />
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  myevents: state.eventsReducer.myevents,
  newEvent: state.eventsReducer.newEvent    
});


export default connect(mapStateToProps, {fetchEvents: fetchEvents, modifyEvents: modifyEvents})(withStyles(styles)(CustomPaginationActionsTable));