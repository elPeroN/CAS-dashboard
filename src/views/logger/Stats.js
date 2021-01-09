import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  useTheme
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Metrics from './Metrics';
import {loggerActionsCreator} from "src/redux/actions/Logger/loggerActionsCreator";
import { createLineStats } from './assets/utils';
import { lineData, lineOptions } from './assets/datasets';

function Stats(props){
  const theme = useTheme();
  let stats  = {
    numbers: [0],
    labels:["No data to show"]
  }

  if (props.activities){ stats = createLineStats(props.activities)};

  return (
    <Card>
      <CardHeader
        title=<Typography
                variant="h4">
                Statistics
                <IconButton aria-label="refresh" >
                  <RefreshIcon
                    color="primary"
                    fontSize="big"
                    onClick={()=>props.loggedFlow(props.token)}/>
                </IconButton>
              </Typography>
        action= <Metrics/>
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Line
            data={lineData(stats,theme)}
            options={lineOptions(theme)}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

function mapStateToProps(state){
  return {
    activities: state.logger.activities ,
    token: state.logger.token
  };
};

const actions = {
  loggedFlow : loggerActionsCreator.loggedFlow
}

export default connect(mapStateToProps,actions)(Stats);
