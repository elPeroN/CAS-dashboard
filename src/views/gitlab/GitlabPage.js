import React from 'react';
import DashPage from 'src/components/DashPage';

import GitlabLogin from './GitlabLogin';
import Commits from './Commits';
import NoRepositoryFound from './NoRepositoryFound';

import { connect } from "react-redux";
import {userActions} from 'src/redux/actions/actions'

function  GitlabPage(props) {

  let content;

  if (!props.gitlabToken) content = <GitlabLogin/>;
  else if(props.gitlabRepos) content = <Commits/>;
  else content = <NoRepositoryFound/>;

  return (
      <DashPage>
        {content}
      </DashPage>
    );
}

function mapStateToProps(state){
  return {
    gitlabToken: state.gitlabToken,
    gitlabRepos: state.gitlabRepos,
    GitlabMenuIndex: state.GitlabMenuIndex
  };
};

const actions = {
  setGitlabMenuIndex: userActions.setGitlabMenuIndex,
  gitlabFlow: userActions.gitlabFlow
}

export default connect(mapStateToProps,actions)(GitlabPage);
