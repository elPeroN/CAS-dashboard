import React from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar/NavBar';
import TopBar from './TopBar';
import SimpleTopBar from './SimpleTopBar';
import SimpleSnackBar from './SimpleSnackBar';

import { connect } from "react-redux";
import {actionsCreator} from "src/redux/actions/actionsCreator"



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
  let navigation;

  if(props.user){
    props.loggedFlow(props.token);
    navigation =
    <React.Fragment>
      <TopBar/>
      <NavBar/>
    </React.Fragment>;
  }else{
    navigation = <SimpleTopBar/>;
  }

  return (
    <div className={classes.root}>
      {navigation}
      <SimpleSnackBar/>
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
  return {
    user: state.user,
    token: state.token
   };
};

const act = {
  loggedFlow : actionsCreator.loggedFlow
}

export default connect(mapStateToProps,act)(DashboardLayout);
