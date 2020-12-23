import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {actionsCreator} from "src/redux/actions/actionsCreator";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function StaticDatePicker(props) {

  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function testDate(){
    props.setEndDate("1111/11/11");
  }

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
                 inputVariant="outlined"
                 variant="inline"
                 format="dd/MM/yyyy"
                 value={selectedDate}
                 onChange={handleDateChange}
               />

               <KeyboardDatePicker
                 autoOk
                 inputVariant="outlined"
                 variant="inline"
                 openTo="date"
                 format="dd/MM/yyyy"
                 value={props.endDate}
                 onChange={props.setEndDate}
               />
            </Grid>
          </MuiPickersUtilsProvider >
        </Grid>
        <Button onClick={testDate}>TEST</Button>
      </CardContent>
    </Card>
  );
};

StaticDatePicker.propTypes = {
  className: PropTypes.string
};

function mapStateToProps(state){
  return{ endDate: state.endDate }
};

const actions = {
  setEndDate: actionsCreator.setEndDate
};

export default connect(mapStateToProps,actions)(StaticDatePicker);
