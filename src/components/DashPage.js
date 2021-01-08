import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
import SimpleBackdrop from './SimpleBackdrop';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  }
}));

function DashPage (props){
  const classes = useStyles();

  if(props.user){
    return (
      <div className={classes.wrapper}>
        {props.children}
        <SimpleBackdrop/>
      </div>
    );
  }else return (<Redirect to="/login"/>)
};

function mapStateToProps(state){
  return {
    user: state.logger.user
  };
};

export default connect(mapStateToProps)(DashPage);
