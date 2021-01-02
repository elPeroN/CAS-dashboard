import React from 'react';
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
          direction="row"
          container
          spacing={3}
          justify="center"
          alignItems="center"
        >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item
              xs={12}
              sm={12}
              md={6}
            >
              <Typography
              variant="h3"
              >
                Logger Dashboard
              </Typography>
            </Grid>
            <Grid item
              xs={12}
              sm={6}
              md={3}
            >
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
             <Grid item
                xs={12}
                sm={6}
                md={3}
             >
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
