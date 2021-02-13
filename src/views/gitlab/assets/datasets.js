import { colorsForGraphs } from 'src/theme/colors';
import { colors } from "@material-ui/core";

export const defaultDevel = {
  author: "",
  labels: ["No data to show"],
  additions: [0],
  deletions: [0],
}

export const develData = (devel,theme) =>{
  return {
    datasets: [
      {
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        data: devel.additions,
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
        data: devel.deletions,
        yAxisID: 'A',
        label: 'Deletions',
        maxBarThickness: 10,
        barThickness: 12,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ],
    labels: devel.labels
  };
};

export const pieData = (stats) => {
  return {
    datasets: [
      {
        data: stats.numbers,
        backgroundColor: colorsForGraphs,
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: stats.labels
  };
};

export const develOptions = theme =>{

  return {
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
};


export const pieOptions = (theme)=>{
  return {
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
};
