import React from 'react';
import PropTypes from 'prop-types';
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";

function AuthPage(props){
  if(!props.user){
    return (
      <div >
        {props.children}
      </div>
    );
  }else return (<Redirect to="/dashboard"/>)
};

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

function mapStateToProps(state){
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(AuthPage);
