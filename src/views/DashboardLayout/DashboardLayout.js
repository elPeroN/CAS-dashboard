import React from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar/NavBar';
import TopBar from './TopBar/TopBar';
import SimpleTopBar from './TopBar/SimpleTopBar';
import SimpleSnackBar from 'src/components/SimpleSnackBar';

import { connect } from "react-redux";
import {loggerCreator} from "src/redux/actions/Logger/loggerCreator";
import {gitlabCreator} from "src/redux/actions/Gitlab/gitlabCreator";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    width:'100%',
    overflow: 'hidden'
  }
}));


function DashboardLayout(props){
  const classes = useStyles();
  let navigation;
  if(props.user){
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
      {props.children}
    </div>
  );
};

function mapStateToProps(state){
  return {
    user: state.logger.user,
    token: state.logger.token,
    gitlabToken: state.gitlab.gitlabToken
   };
};

const actions = {
  loggedFlow : loggerCreator.loggedFlow,
  gitlabFlow : gitlabCreator.gitlabFlow
}

export default connect(mapStateToProps,actions)(DashboardLayout);
