import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
  card: {
    maxWidth: 555, // should be set to this.     
    // maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class  SimpleCard extends Component {
  render() {
  const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Event Information 
          </Typography>
          <Typography variant="h5" component="h2">
            Please enter your event id
          </Typography>
          <TextField
          id="outlined-helperText"
          label="Event Id"          
          className={classes.textField}          
          margin="normal"
          variant="outlined"
        />         
        </CardContent>
        <CardActions>          
          <Fab size="small" variant="extended" aria-label="Delete" className={classes.fab}>
            <NavigationIcon className={classes.extendedIcon} />
            Fetch Info
          </Fab>
        </CardActions>
      </Card>
    );
  } 
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);