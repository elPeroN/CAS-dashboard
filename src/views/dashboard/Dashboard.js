import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import DashPage from 'src/components/DashPage';
import Metrics from './Metrics';
import Plugins from './Plugins';
import Stats from './Stats';
import PieChart from './PieChart';
import Files from './Files';
import StaticDatePicker from './DatePicker';
import SimpleBackdrop from './SimpleBackdrop';

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function  Dashboard(props) {
  const classes = useStyles();

  return (
      <DashPage
        className={classes.root}
        title="Dashboard"
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <StaticDatePicker />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Metrics />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Stats />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <PieChart/>
            </Grid>
            <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
            >
            <Files />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <Plugins />
            </Grid>
          </Grid>
        </Container>
        <SimpleBackdrop/>
      </DashPage>
    );
}

function mapStateToProps(state){
  return {
    user: state.user,
    token: state.token
  };
};

export default connect(mapStateToProps)(Dashboard);
