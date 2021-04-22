import React from 'react';
import DashPage from 'src/components/DashPage';

import GitlabLogin from './GitlabLogin';
import GitlabDash from './GitlabDash';

import { connect } from "react-redux";

function  GitlabPage(props) {
  let content;

  if (!props.token) content = <GitlabLogin/>;
  else content = <GitlabDash/>;

  return (
      <DashPage>
        {content}
      </DashPage>
    );
}

function mapStateToProps(state){
  return {
    token: state.gitlab.gitlabToken
  };
}

export default connect(mapStateToProps)(GitlabPage);
