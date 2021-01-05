import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  useTheme
} from '@material-ui/core';

import {connect} from 'react-redux';
import {userActions} from 'src/redux/actions/actions'

let author;
let labels ;
let additions ;
let deletions ;

function arrangeStats(item){
  return item.created_at.slice(0,10);
}

function createStats(data){
  author = data[0].author_name;
  labels = [];
  additions = [];
  deletions = [];

  const map = data.reduce((acc, item) => {
      if( acc[arrangeStats(item)]) {
        acc[arrangeStats(item)].additions = acc[arrangeStats(item)].additions + item.stats.additions;
        acc[arrangeStats(item)].deletions = acc[arrangeStats(item)].deletions + item.stats.deletions;
      }
      else acc[arrangeStats(item)] = {additions:item.stats.additions, deletions:item.stats.deletions};
      return acc;
  },{});

  let sortedMap = Object.keys(map).sort().reduce( (acc,key) =>{
      map[key].label = key;
      acc.push(map[key]);
      return acc;
  },[]);

  sortedMap.forEach(item =>{
    labels.push(item.label);
    additions.push(item.additions);
    deletions.push(item.deletions);
  })
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

function Devel(props){
  const theme = useTheme();
  const classes = useStyles();

  if (props.develStats){createStats(props.develStats)}
  else {
    author = "";
    labels = ["No data to show"];
    additions = [0];
    deletions = [0];
  }

  const data = {
    datasets: [
      {
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        data: additions,
        yAxisID: 'A',
        label: 'Additions',
        maxBarThickness: 10,
        barThickness: 12,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
      {
        fill: false,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        data: deletions,
        yAxisID: 'A',
        label: 'Deletions',
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
          stacked:true,
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
          stacked:true,
          position:'left',
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

  return(
    <React.Fragment>
      <Card>
        <CardHeader
          title={author}
          action={<Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={()=> props.setGitlabView('recap')}
                    >Indietro
                  </Button>}
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
    </React.Fragment>
  )
}

function mapStateToProps(state){
  return {
    develStats: state.develStats
  };
};

const actions = {
  setGitlabView: userActions.setGitlabView
}

export default connect(mapStateToProps,actions)(Devel);
