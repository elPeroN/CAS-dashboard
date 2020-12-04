import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import {ExitToApp} from '@material-ui/icons';
import Logo from 'src/components/Logo';

import { connect } from "react-redux";
import {userActions} from "src/redux/actions/actions"


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  logo: {
    height: 60
  }
}));

function TopBar (props) {
  const classes = useStyles();
  const [notifications] = useState([]);
  return (
    <AppBar
      className={clsx(classes.root)}
      elevation={0}
    >
      <Toolbar>
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
          <IconButton color="inherit" onClick={props.logout}>
            <ExitToApp />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={props.onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

function mapStateToProps(state){
  return { isLogged: state.isLogged };
};

const actionCreators = {
  logout: userActions.logout
}

export default connect(mapStateToProps, actionCreators)(TopBar);
