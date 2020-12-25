import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { connect } from 'react-redux';
import {actionsCreator} from "src/redux/actions/actionsCreator"


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SimpleSnackBar(props) {

  const handleClose=(event,reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.clearSnackbar();
  };
  if(props.snackbar) {
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={props.snackbar.isOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          >
            <Alert severity={props.snackbar.severity} onClose={handleClose}>
              {props.snackbar.message}
            </Alert>
          </Snackbar>
      </React.Fragment>
    );
  }else return(<React.Fragment/>);
}

function mapStateToProps(state){
  return {
    snackbar: state.snackbar
  };
}

const actions = {
  sendNotification: actionsCreator.sendNotification,
  clearSnackbar: actionsCreator.clearSnackbar
}

export default connect(mapStateToProps,actions)(SimpleSnackBar);
