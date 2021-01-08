import React from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar/NavBar';
import TopBar from './TopBar/TopBar';
import SimpleTopBar from './TopBar/SimpleTopBar';
import SimpleSnackBar from 'src/components/SimpleSnackBar';

import { connect } from "react-redux";
import {loggerActionsCreator} from "src/redux/actions/Logger/loggerActionsCreator";
import {gitlabActionsCreator} from "src/redux/actions/Gitlab/gitlabActionsCreator";

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
  loggedFlow : loggerActionsCreator.loggedFlow,
  gitlabFlow : gitlabActionsCreator.gitlabFlow
}

export default connect(mapStateToProps,actions)(DashboardLayout);
