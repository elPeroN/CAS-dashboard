import React from 'react';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar/NavBar';
import TopBar from './TopBar/TopBar';
import SimpleTopBar from './TopBar/SimpleTopBar';
import SimpleSnackBar from 'src/components/SimpleSnackBar';

import { connect } from "react-redux";

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
    user: state.logger.user
   };
};

export default connect(mapStateToProps)(DashboardLayout);
