import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme
} from '@material-ui/core';
import { createFileStats } from './assets/utils';
import { filesData, filesOptions } from './assets/datasets';

function Stats(props){
  const theme = useTheme();
  let stats;

  if (props.activities){ stats = createFileStats(props.activities)}
  else stats = {
      numbers:[0],
      labels: ["No data to show"],
      time:[0]
    }

  return (
    <Card>
      <CardHeader
        title="File Statistics"
        />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
            data={filesData(stats,theme)}
            options={filesOptions(theme)}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state){
  return {
    activities: state.logger.activities };
}

export default connect(mapStateToProps)(Stats);
