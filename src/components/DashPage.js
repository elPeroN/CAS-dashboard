import React from 'react';
import PropTypes from 'prop-types';
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";

function DashPage (props){
  if(props.user){
    return (
      <div>
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
