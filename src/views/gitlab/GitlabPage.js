import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import GitlabLogin from './GitlabLogin'
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {actionsCreator} from "src/redux/actions/actionsCreator"

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
  return (
      <Page
        className={classes.root}
        title="Gitlab"
      >
      <GitlabLogin/>
      </Page>
    );
}

function mapStateToProps(state){
  return {
    user: state.user,
    token: state.token
  };
};

export default connect(mapStateToProps)(GitlabPage);
