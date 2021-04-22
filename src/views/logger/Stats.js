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
import {loggerCreator} from "src/redux/actions/Logger/loggerCreator";
import { createLineStats } from './assets/utils';
import { lineData, lineOptions } from './assets/datasets';

function Stats(props){
  const theme = useTheme();
  let stats  = {
    numbers: [0],
    labels:["No data to show"]
  }

  if (props.activities){ stats = createLineStats(props.activities)}

  return (
    <Card>
      <CardHeader
        title=<Typography
                variant="h4">
                Statistics
                <IconButton aria-label="refresh"   onClick={()=>props.loggedFlow(props.token)}>
                  <RefreshIcon
                    color="primary"
                    fontSize="large"
                  />
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
}

function mapStateToProps(state){
  return {
    activities: state.logger.activities ,
    token: state.logger.loggerToken
  };
}

const actions = {
  loggedFlow : loggerCreator.loggedFlow
}

export default connect(mapStateToProps,actions)(Stats);
