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
  Typography,
  makeStyles
} from '@material-ui/core';

import {connect} from 'react-redux';
import {
  ExitToApp as ExitToAppIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Shop as ShoppingBagIcon,
  Person as UserIcon,
  Group as UsersIcon
} from '@material-ui/icons';
import NavItem from './NavItem';
import {actionsCreator} from "src/redux/actions/actionsCreator";
import {userActions} from "src/redux/actions/actions"


const user = {
  avatar: '/static/images/avatars/avatar_3.png',
  jobTitle: 'Senior Developer',
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
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
         to="/app/account"
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
         {items.map((item) => (
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
    name : state.name,
    surname: state.surname,
    mobileNav: state.mobileNav
  };
}

const actionCreators = {
  logout: actionsCreator.logout,
  setMobileNavOpen: userActions.setMobileNavOpen
}

export default connect(mapStateToProps,actionCreators)(NavBar);
