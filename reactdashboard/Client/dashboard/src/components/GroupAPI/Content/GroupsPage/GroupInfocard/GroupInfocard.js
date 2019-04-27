import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 275,    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function GroupInfocard(props) {
  const { classes } = props; 
  const { groupDetails } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Group Information
        </Typography>
        <br/>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Group Name
        </Typography>        
        <Typography component="p">
          {groupDetails.group_name}
        </Typography> 
        <br/>  
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Group City
        </Typography>        
        <Typography component="p">
          {groupDetails.group_city}
        </Typography>
        <br/>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Group Country
        </Typography>
        <Typography component="p">
          {groupDetails.group_country.toUpperCase()}
        </Typography> 
        <br/>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Group State
        </Typography>
        <Typography component="p">
          {groupDetails.group_state}
        </Typography>     
      </CardContent>
    </Card>
  );
}

GroupInfocard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupInfocard);