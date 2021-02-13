import React from 'react';
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { mattermostCreator } from "src/redux/actions/Mattermost/mattermostCreator";
import Teams from './Teams';


function MattermostDialog(props) {

  return (
      <React.Fragment>
        <Button onClick={()=> props.logout()}>Logout</Button>
        <Teams/>
      </React.Fragment>
    );
}

function mapStateToProps(state){
  return {
    mattermostToken: state.mattermost.mattermostToken
  };
};

const actions = {
  logout: mattermostCreator.logoutMattermost
}

export default connect(mapStateToProps,actions)(MattermostDialog);
