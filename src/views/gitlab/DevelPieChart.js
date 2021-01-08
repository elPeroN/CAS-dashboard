import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  useTheme
} from '@material-ui/core';
import {colorsForGraphs} from 'src/theme/colors';
import {connect} from 'react-redux';

let numbers;
let labels;

function createStats(developers){
  labels=[];
  numbers=[];
  developers.forEach((item, i) => {
    labels.push(item.name);;
    numbers.push(item.commits);
  });
}

function PieChart(props) {
  const theme = useTheme();

  if (props.stats){createStats(props.stats)}
  else {
    labels =["No data to show"];
    numbers = [0];
  }

  const data = {
    datasets: [
      {
        data: numbers,
        backgroundColor: colorsForGraphs,
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: labels
  };

  const options = {
    animation: {
      animateRotate :true
    },
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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
    <Card >
      <CardHeader title="Commits" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
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
    activities: state.gitlab.activities };
};

export default connect(mapStateToProps)(PieChart);
