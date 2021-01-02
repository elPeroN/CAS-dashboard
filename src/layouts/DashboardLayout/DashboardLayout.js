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
    props.loggedFlow(props.token);
    if(props.gitlabToken) props.gitlabFlow(props.gitlabToken);
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
    user: state.user,
    token: state.token,
    gitlabToken: state.gitlabToken
   };
};

const act = {
  loggedFlow : actionsCreator.loggedFlow,
  gitlabFlow : actionsCreator.gitlabFlow
}

export default connect(mapStateToProps,act)(DashboardLayout);
