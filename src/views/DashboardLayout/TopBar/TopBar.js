import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from "react-redux";
import {appActions} from "src/redux/actions/App/appActions"
import Mattermost from "src/views/mattermost/Mattermost"
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Popover,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'src/components/Logo';
import MattermostIcon from 'src/assets/icons/MattermostIcon';

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openMobile(){
    props.setMobileNavOpen(true)
  }

  const open = Boolean(anchorEl);

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo}/>
        </RouterLink>
        <Box flexGrow={1} />
        <IconButton
          color="inherit"
          onClick={handleClick}
        >
          <Badge
            badgeContent={0}
            color="secondary"
            showZero
          >
            <MattermostIcon />
          </Badge>
        </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
             }}
             transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
           >
           <Mattermost/>
         </Popover>
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
