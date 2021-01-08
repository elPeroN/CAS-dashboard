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


let numbers ;
let labels ;

function createStats(activities){
  const map = activities.reduce((acc, e) => acc.set(e.end_time.slice(0,10), (acc.get(e.end_time.slice(0,10)) || 0) + 1), new Map());
  const sortedMap = new Map([...map].sort((a, b) => a[0] > b[0] ? 1 : -1));
  labels = [...sortedMap.keys()];
  numbers = [ ...sortedMap.values()];
}

function Stats(props){
  const theme = useTheme();

  if (props.activities){createStats(props.activities)}
  else {
    numbers = [0];
    labels = ["No data to show"];
  }

  const data = {
    datasets: [
      {
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        data: numbers,
        label: 'Daily Metrics'
      }
    ],
    labels: labels
  };

  const options = {
    animation:  {
          linear :true
        },
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

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
            data={data}
            options={options}
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
