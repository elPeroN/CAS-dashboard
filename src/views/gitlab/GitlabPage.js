import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles } from '@material-ui/core';
import DashPage from 'src/components/DashPage';
import SelectedMenu from 'src/components/SelectedMenu';

import GitlabLogin from './GitlabLogin';
import Developers from './Developers';

import { connect } from "react-redux";
import {userActions} from 'src/redux/actions/actions'


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
  let menu = ["No repository found"];

  if (!props.gitlabToken) content = <GitlabLogin/>;
  else {
    if(props.gitlabRepos){
      menu = props.gitlabRepos.map( item => item.name);
    }
    content = (
      <Card >
        <CardHeader
          title="Gitlab recap"
          action= <SelectedMenu list={menu} index={props.gitlabIndex} setSelectedIndex={props.setGitlabIndex}/>
          />
        <Divider />
        <CardContent>
          <Developers/>
        </CardContent>
      </Card>
  )
};

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
    gitlabToken: state.gitlabToken,
    gitlabRepos: state.gitlabRepos,
    gitlabIndex: state.gitlabIndex
  };
};

const actions = {
  setGitlabIndex: userActions.setGitlabIndex
}

export default connect(mapStateToProps,actions)(GitlabPage);
