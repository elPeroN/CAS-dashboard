import React from 'react';
import PropTypes from 'prop-types';
import {actionsCreator} from "src/redux/actions/actionsCreator";
import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

function StaticDatePicker(props) {

  return (
    <Card>
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="h6"
                >
                  Period
                </Typography>
               <KeyboardDatePicker
                 autoOk
                 label="Start Date"
                 inputVariant="outlined"
                 variant="inline"
                 format="dd/MM/yyyy"
                 maxDate={props.endDate}
                 value={props.startDate}
                 onChange={props.setStartDate}
               />
             </Grid>
             <Grid item>
               <KeyboardDatePicker
                 autoOk
                 label="End Date"
                 inputVariant="outlined"
                 variant="inline"
                 openTo="date"
                 format="dd/MM/yyyy"
                 minDate={props.startDate}
                 maxDate={new Date()}
                 value={props.endDate}
                 onChange={props.setEndDate}
               />
            </Grid>
          </MuiPickersUtilsProvider >
        </Grid>
      </CardContent>
    </Card>
  );
};

StaticDatePicker.propTypes = {
  className: PropTypes.string
};

function mapStateToProps(state){
  return{
    startDate: state.startDate,
    endDate: state.endDate }
};

const actions = {
  setStartDate: actionsCreator.setStartDate,
  setEndDate: actionsCreator.setEndDate
};

export default connect(mapStateToProps,actions)(StaticDatePicker);
