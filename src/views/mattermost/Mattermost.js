import React from 'react';

import MattermostLogin from 'src/views/mattermost/MattermostLogin';
import MattermostDialog from 'src/views/mattermost/MattermostDialog';

import { connect } from "react-redux";


function Mattermost(props) {
  let content;
  if (props.mattermostToken) content = <MattermostDialog/>;
  else content = <MattermostLogin/>;

  return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
}

function mapStateToProps(state){
  return {
    state: state,
    mattermostToken: state.mattermost.mattermostToken
  };
};

export default connect(mapStateToProps)(Mattermost);
