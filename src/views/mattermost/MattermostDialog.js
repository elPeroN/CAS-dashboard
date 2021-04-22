import React from 'react';
import { connect } from "react-redux";
import {
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from "@material-ui/core";
import {
  MeetingRoom as MeetingRoomIcon,
  Mail as MailIcon
} from '@material-ui/icons';

import MattermostIcon from 'src/assets/icons/MattermostIcon';
import {mattermostActions} from "src/redux/actions/Mattermost/mattermostActions";
import {config} from 'src/services/config';

function MattermostDialog(props) {

  let list =
      <ListItem>
        <ListItemText primary="You haven't unread messages" />
      </ListItem>

  if(props.messages[0])
      list =
      <React.Fragment>
        {props.messages.map((message, index) => (
        <ListItem key={index}>
          <ListItemText primary={message.channel} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="mail" onClick={() => window.location = `${config.URL}/mattermost`}>
              <Badge badgeContent={message.num} color="primary">
                <MailIcon />
              </Badge>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        ))}
      </React.Fragment>

  return (
      <React.Fragment>
        <List >
          <ListItem key="title">
            <ListItemIcon>
              <MattermostIcon />
            </ListItemIcon>
            <ListItemText primary= "Mattermost" />
            <ListItemSecondaryAction>
              <IconButton variant="contained" edge="end" aria-label="logout" color="primary" onClick={()=> props.logout()}>
                  <MeetingRoomIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider/>
          {list}
        </List>
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
}

const actions = {
  setMenuIndex: mattermostActions.setMattermostMenuIndex,
  setTeamId: mattermostActions.setTeamId,
  logout: mattermostActions.logoutMattermost
}

export default connect(mapStateToProps,actions)(MattermostDialog);
