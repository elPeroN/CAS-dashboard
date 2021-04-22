import React from 'react';
import {connect} from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme
} from '@material-ui/core';

import { createPieStats } from './assets/utils';
import { pieData, pieOptions } from './assets/datasets';

function PieChart(props) {
  const theme = useTheme();

  let stats = {
    labels:["No data to show"],
    numbers:[0]
  }

  if (props.stats){ stats = createPieStats(props.stats)}

  return (
    <Card >
      <CardHeader title="Commits" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={pieData(stats)}
            options={pieOptions(theme)}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state){
  return {
    activities: state.gitlab.activities };
}

export default connect(mapStateToProps)(PieChart);
