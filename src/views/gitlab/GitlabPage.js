import React from 'react';
import DashPage from 'src/components/DashPage';

import GitlabLogin from './GitlabLogin';
import GitlabDash from './GitlabDash';

import { connect } from "react-redux";

function  GitlabPage(props) {
  let content;

  if (!props.gitlabToken) content = <GitlabLogin/>;
  else content = <GitlabDash/>;

  return (
      <DashPage>
        {content}
      </DashPage>
    );
}

function mapStateToProps(state){
  return {
    gitlabToken: state.gitlab.gitlabToken,
    gitlabRepos: state.gitlab.gitlabRepos
  };
};

export default connect(mapStateToProps)(GitlabPage);
