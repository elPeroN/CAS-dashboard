import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme
} from '@material-ui/core';
import {connect} from 'react-redux';
import {defaultPieStats, lines, pieData, pieOptions} from './assets/datasets';
import {createPieStats} from './assets/utils';

function PieChart(props) {
  const theme = useTheme();
  let stats;

  if (props.activities){
    stats = createPieStats(props.activities);
  }
  else stats = defaultPieStats;

  return (
    <Card >
      <CardHeader title="Lines" />
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
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {lines(stats).map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

function mapStateToProps(state){
  return {
    activities: state.logger.activities };
};

export default connect(mapStateToProps)(PieChart);
