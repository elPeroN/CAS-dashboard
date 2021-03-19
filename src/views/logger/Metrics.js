import React from 'react';
import {
  Avatar,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 64,
    width: 64
  }
}));

function Metrics(props) {
  const classes = useStyles();
  let text;
  if(props.activities){
    text = props.activities.length;
  }else text = "N/A";

  return (
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Typography
              color="textSecondary"
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
            <Typography
            color="textSecondary"
            variant="caption"
            >
            Max(10000)
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EqualizerIcon />
            </Avatar>
          </Grid>
        </Grid>
  );
};

function mapStateToProps(state){
  return {
    activities: state.logger.activities};
};

export default connect(mapStateToProps)(Metrics);
