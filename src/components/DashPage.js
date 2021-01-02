import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";

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
      </div>
    );
  }else return (<Redirect to="/login"/>)
};

function mapStateToProps(state){
  return {
    user: state.user
  };
};

DashPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default connect(mapStateToProps)(DashPage);
