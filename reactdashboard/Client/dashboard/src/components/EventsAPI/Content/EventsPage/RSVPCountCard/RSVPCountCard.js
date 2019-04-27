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

function RSVPCountCard(props) {
  const { classes } = props; 

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Real time rsvp ticker
        </Typography>
        <Typography variant="h5" component="h2">
          RSVP Counter
        </Typography>
        <Typography component="p">
          {props.totalCount}
        </Typography>
      </CardContent>
    </Card>
  );
}

RSVPCountCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RSVPCountCard);