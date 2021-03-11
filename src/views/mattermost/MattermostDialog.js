import React from 'react';
import { connect } from "react-redux";
import {
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import {mattermostActions} from "src/redux/actions/Mattermost/mattermostActions";


function MattermostDialog(props) {

  let list =
    <List>
      <ListItem>
        <ListItemText primary="You haven't unread messages" />
      </ListItem>
    </List>

  if(props.messages[0])
    list =
      <List >
        {props.messages.map((message, index) => (
        <ListItem key={index}>
          <ListItemText primary={message.channel} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <Badge badgeContent={message.num} color="primary">
                <MailIcon />
              </Badge>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        ))}
      </List>

  return (
      <React.Fragment>
        {list}
      </React.Fragment>
    );
}

function mapStateToProps(state){
  return {
    channels: state.mattermost.channels,
    teams: state.mattermost.teams,
    messages: state.mattermost.messages,
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

export default connect(mapStateToProps,actions)(MattermostDialog);
