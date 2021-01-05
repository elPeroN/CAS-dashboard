import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import DashPage from 'src/components/DashPage';
import Plugins from './Plugins';
import Stats from './Stats';
import PieChart from './PieChart';
import Files from './Files';
import StaticDatePicker from './DatePicker';


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
      <DashPage>
        <Container maxWidth={false} className={classes.root}>
          <Grid
            container
            spacing={3}
          >
            <Grid item
              sm={12}
              lg={12}
              xl={12}
              xs={12}
            >
              <StaticDatePicker/>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              xl={5}
            >
              <Stats />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={2}
            >
              <PieChart/>
            </Grid>
            <Grid
            item
            xs={12}
            sm={12}
            md={9}
            lg={9}
            xl={5}
            >
            <Files />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={3}
            >
              <Plugins />
            </Grid>
          </Grid>
        </Container>
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
