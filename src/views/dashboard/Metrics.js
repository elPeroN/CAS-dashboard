import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

function Metrics(props) {
  const classes = useStyles();
  let text;
  if(props.activities){
    text = props.activities.length;
  }else text = "Loading...";

  return (
    <Card>
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Total Metrics
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {text}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Metrics.propTypes = {
  className: PropTypes.string
};

function mapStateToProps(state){
  return {
    activities: state.activities};
};

export default connect(mapStateToProps)(Metrics);
