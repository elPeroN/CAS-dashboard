import React from 'react';
import {  makeStyles } from '@material-ui/core';
import DashPage from 'src/components/DashPage';

import GitlabLogin from './GitlabLogin'

import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function  GitlabPage(props) {
  const classes = useStyles();
  let content;
  if (props.gitlabToken) content = <div>LOGGED</div>
  else content = <GitlabLogin/>;
  return (
      <DashPage
        className={classes.root}
        title="Gitlab"
      >
      {content}
      </DashPage>
    );
}

function mapStateToProps(state){
  return {
    gitlabToken: state.gitlabToken
  };
};

export default connect(mapStateToProps)(GitlabPage);
