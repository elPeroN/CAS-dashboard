import React, {useEffect} from 'react';
import { connect } from "react-redux";
import SelectedMenu from "./SelectedMenu";
import {mattermostActions} from "src/redux/actions/Mattermost/mattermostActions";
import { fetchThreads } from "src/services/mattermost";

function Teams(props) {

  let menu = props.teams.map( item => item.display_name);

  useEffect(() => {
    props.setTeamId(props.teams[props.menuIndex].id);
    fetchThreads(props.token, props.userId, props.teamId).then( response =>{
      console.log(response);
      // let filtered = response.data.filter( (item,i) =>{
      //   item["key"] = uuid();
      //   item["color"] = colorsForGraphs[i];
      //   return item;
      // })
      // setDevs(filtered);
    })
    .catch(e =>{
      console.log(e);
    })
  },[props]);

  return (
      <React.Fragment>
        <SelectedMenu
           list={menu}
           index={props.menuIndex}
           setSelectedIndex={props.setMenuIndex}
        />
      </React.Fragment>
    );
}

function mapStateToProps(state){
  return {
    channels: state.mattermost.channels,
    teams: state.mattermost.teams,
    menuIndex: state.mattermost.mattermostMenuIndex,
    token: state.mattermost.mattermostToken,
    userId: state.mattermost.mattermostId,
    teamId: state.mattermost.mattermostTeamId
  };
};

const actions = {
  setMenuIndex: mattermostActions.setMattermostMenuIndex,
  setTeamId: mattermostActions.setTeamId
}

export default connect(mapStateToProps,actions)(Teams);
