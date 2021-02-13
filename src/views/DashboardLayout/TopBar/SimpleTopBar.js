import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(({
  root: {
    position: "absolute"
  },
  toolbar: {
    height: 64
  },
  logo: {
    height: 60
  }
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar
    className={classes.root}
      elevation={0}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo}/>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
