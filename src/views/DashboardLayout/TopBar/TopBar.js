import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Logo from 'src/components/Logo';

import { connect } from "react-redux";
import {appActions} from "src/redux/actions/App/appActions"

const useStyles = makeStyles(() => ({
  avatar: {
    width: 60,
    height: 60
  },
  toolbar: {
    height: 64
  },
  logo: {
    height: 60
  }
}));

function TopBar(props) {
  const classes = useStyles();
  const [notifications] = useState([]);

  function openMobile(){
    props.setMobileNavOpen(true)
  }

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo}/>
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={openMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state){
  return { mobileNav: state.app.mobileNav};
};

const act = {
  setMobileNavOpen : appActions.setMobileNavOpen
}

export default connect(mapStateToProps,act)(TopBar);
