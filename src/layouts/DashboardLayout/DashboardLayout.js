import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar/NavBar';
import TopBar from './TopBar';
import SimpleTopBar from './SimpleTopBar';

import { withRouter} from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '99vh',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',

    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));


function DashboardLayout(props){
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  let navigation;

  if(props.isLogged){
    navigation =
    <React.Fragment>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
    </React.Fragment>;
  }else{
    navigation = <SimpleTopBar/>;
  }

  return (
    <div className={classes.root}>
      {navigation}
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state){
  return { isLogged: state.isLogged };
};

export default withRouter(connect(mapStateToProps)(DashboardLayout));
