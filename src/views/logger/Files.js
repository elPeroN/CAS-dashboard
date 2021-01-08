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

let numbers ;
let labels ;
let time ;

//function get filename from path
function arrangeStats(activity){
  return activity.executable_name.replace(/^.*(\\|\/)/, '');
}

function getTime(activity){
  var diff = Math.abs(new Date(activity.end_time) - new Date(activity.start_time));
  return diff;
}

function createStats(activities){
  let filtered = activities.filter(name => name.executable_name.includes('.'));

  const map = filtered.reduce((acc, item) => {
      if( acc[arrangeStats(item)]) {
        acc[arrangeStats(item)].items = acc[arrangeStats(item)].items + 1 ;
        acc[arrangeStats(item)].time = acc[arrangeStats(item)].time + getTime(item);
      }
      else acc[arrangeStats(item)] = {items:1, time:getTime(item)};
      return acc;
  },{});

  labels = [];
  numbers = [];
  time = [];
  for (const prop in map) {
    //show only files with > 20 metrics
    if(map[prop].items > 20){
      labels.push(prop);
      time.push(map[prop].time);
      numbers.push(map[prop].items);
    }
  }
}

function Stats(props){
  const theme = useTheme();


  if (props.activities){createStats(props.activities)}
  else {
    numbers = [0];
    labels = ["No data to show"];
    time = [0];
  }

  const data = {
    datasets: [
      {
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        data: numbers,
        yAxisID: 'A',
        label: 'Metrics',
        maxBarThickness: 10,
        barThickness: 12,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
      {
        fill: false,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        data: time,
        yAxisID: 'B',
        label: 'Time (ms)',
        maxBarThickness: 10,
        barThickness: 12,
        barPercentage: 0.5,
        categoryPercentage: 0.5
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
          position:'right',
          id: 'A',
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
        },
        {
          position:'left',
          id: 'B',
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
        title="File Statistics"
        />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Bar
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
    activities: state.logger.activities };
};

export default connect(mapStateToProps)(Stats);
