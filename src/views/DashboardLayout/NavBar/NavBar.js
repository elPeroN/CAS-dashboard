import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';

import {connect} from 'react-redux';
import {
  ExitToApp as ExitToAppIcon,
  BarChart as BarChartIcon
} from '@material-ui/icons';

import GitlabIcon from 'src/assets/icons/GitlabIcon';
import TaigaIcon from 'src/assets/icons/TaigaIcon';
import SonarQubeIcon from "src/assets/icons/SonarQube";
import JenkinsIcon from "src/assets/icons/JenkinsIcon";
import BugzillaIcon from "src/assets/icons/BugzillaIcon";
import NavItem from './NavItem';
import { loggerCreator } from "src/redux/actions/Logger/loggerCreator";
import { appActions } from "src/redux/actions/App/appActions";

const user = {
  avatar: ''
};

const dashItems = [
  {
    href: '/logger',
    icon: BarChartIcon,
    title: 'Logger'
  },
  {
    href: '/gitlab',
    icon: GitlabIcon,
    title: 'Gitlab'
  },
  {
    href: '/taiga',
    icon: TaigaIcon,
    title: 'Taiga'
  },
  {
    href: '/sonar',
    icon: SonarQubeIcon,
    title: 'SonarQube'
  }
];

const otherItems = [
  {
    href: '/jenkins',
    icon: JenkinsIcon,
    title: 'Jenkins'
  },
  {
    href:  '/bugzilla',
    icon: BugzillaIcon,
    title: 'Bugzilla'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));


function NavBar(props){

  function logout(){
    props.logout();
  }
  const classes = useStyles();

  let name = '';
  let surname = '';
  if (props.name){
    name = props.name;
    surname = props.surname;
  }
 const content = (
   <Box
     height="100%"
     display="flex"
     flexDirection="column"
   >
     <Box
       alignItems="center"
       display="flex"
       flexDirection="column"
       p={2}
     >
       <Avatar
         className={classes.avatar}
         component={RouterLink}
         src={user.avatar}
         to="/"
       />
       <Typography
         className={classes.name}
         color="textPrimary"
         variant="h5"
       >
         {name+" "+surname}
       </Typography>
       <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<ExitToAppIcon/>}
          onClick={logout}>
          Logout
      </Button>
     </Box>
     <Divider />
     <Box p={2}>
       <List>
         <ListSubheader component="div" id="1">
            Dashboard Services
         </ListSubheader>
         <Divider/>
         {dashItems.map((item) => (
           <NavItem
             href={item.href}
             key={item.title}
             title={item.title}
             icon={item.icon}
           />
         ))}
         <Divider/>
         <ListSubheader component="div" id="2">
            Other CAS Services
         </ListSubheader>
         <Divider/>
         {otherItems.map((item) => (
           <NavItem
             href={item.href}
             key={item.title}
             title={item.title}
             icon={item.icon}
           />
         ))}
       </List>
     </Box>
   </Box>
 );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={() => props.setMobileNavOpen(false)}
          open={props.mobileNav}
          variant="temporary"
        >
        {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
        {content}
        </Drawer>
      </Hidden>
    </>
  );
};

function mapStateToProps(state){
  return {
    name : state.logger.name,
    surname: state.logger.surname,
    mobileNav: state.app.mobileNav
  };
}

const actions = {
  logout: loggerCreator.logout,
  setMobileNavOpen: appActions.setMobileNavOpen
}

export default connect(mapStateToProps,actions)(NavBar);
