import React from 'react';
import PropTypes from 'prop-types';
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {makeStyles} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  }
}));

function AuthPage(props){
  const classes = useStyles();

  if(!props.user){
    return (
      <div className={classes.wrapper}>
      <div className={classes.root}>
        {props.children}
      </div>
      </div>
    );
  }else return (<Redirect to="/dashboard"/>)
};

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

function mapStateToProps(state){
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(AuthPage);
