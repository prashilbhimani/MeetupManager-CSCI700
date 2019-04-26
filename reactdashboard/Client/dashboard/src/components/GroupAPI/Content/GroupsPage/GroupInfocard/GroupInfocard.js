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
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Real time updates
        </Typography>
        <Typography variant="h5" component="h2">
          Group Name
        </Typography>
        <Typography component="p">
          {groupDetails.group_name}
        </Typography>   
        <Typography variant="h5" component="h2">
          Group City
        </Typography>
        <Typography component="p">
          {groupDetails.group_city}
        </Typography>
        <Typography variant="h5" component="h2">
          Group Country
        </Typography>
        <Typography component="p">
          {groupDetails.group_country}
        </Typography> 
        <Typography variant="h5" component="h2">
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