import React, {useEffect} from 'react';
import { connect } from "react-redux";
import SelectedMenu from "./SelectedMenu";
import {mattermostActions} from "src/redux/actions/Mattermost/mattermostActions";

function Threads(props) {

  let menu = props.teams.map( item => item.display_name);

  // useEffect(() => {
  //   props.setTeamId(props.teams[props.mattermostMenuIndex].id);
  // },[props.mattermostMenuIndex]);

  return (
      <React.Fragment>
        <SelectedMenu
           list={menu}
           index={props.mattermostMenuIndex}
           setSelectedIndex={props.setMattermostMenuIndex}
        />
      </React.Fragment>
    );
}

function mapStateToProps(state){
  return {
    channels: state.mattermost.channels,
    teams: state.mattermost.teams,
    mattermostMenuIndex: state.mattermost.mattermostMenuIndex,
    mattermostTeamId:state.mattermostTeamId
  };
};

const actions = {
  setMattermostMenuIndex: mattermostActions.setMattermostMenuIndex,
  setTeamId: mattermostActions.setTeamId
}

export default connect(mapStateToProps,actions)(Treads);
