import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';

let numbers = [0];
let labels = ["No data to show"];
let addPercentage = 0;
let delPercentage = 0;
let changePercentage = 0;

function createStats(activities){
  let filtered = activities.filter(name => name.activity_type.includes('lines'));
  const map = filtered.reduce((acc, e) =>
        acc.set(e.activity_type.replace('eclipse_','').replace('atom_','').replace('deleted','delete'),
        (acc.get(e.activity_type.replace('eclipse_','').replace('atom_','').replace('deleted','delete')) || 0) + 1)
        , new Map());
  labels = [...map.keys()];
  numbers = [ ...map.values()];
}

function Lines (props) {
  const theme = useTheme();

  if (props.activities){createStats(props.activities)}
  const data = {
    datasets: [
      {
        data: numbers,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: labels
  };

  const options = {
    animation: false,
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

  const devices = [
    {
      title: 'Lines Added',
      value: addPercentage,
      icon: AddCircleOutlineIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Lines Deleted',
      value: delPercentage,
      icon: RemoveCircleOutlineIcon,
      color: colors.red[600]
    },
    {
      title: 'Lines Changed',
      value: changePercentage,
      icon: EditIcon,
      color: colors.orange[600]
    }
  ];

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
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
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

Lines.propTypes = {
  className: PropTypes.string
};

function mapStateToProps(state){
  return {
    activities: state.activities };
};

export default connect(mapStateToProps)(Lines);
