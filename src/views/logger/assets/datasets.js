import {colors} from '@material-ui/core';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  Edit as EditIcon
} from '@material-ui/icons';

export const lines = (stats) =>{
  return [
    {
      title: 'Lines Added',
      value: stats.addPercentage,
      icon: AddCircleOutlineIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Lines Deleted',
      value: stats.delPercentage,
      icon: RemoveCircleOutlineIcon,
      color: colors.red[600]
    },
    {
      title: 'Lines Changed',
      value: stats.changePercentage,
      icon: EditIcon,
      color: colors.orange[600]
    }
  ];
};

export const defaultPieStats = {
  labels:["No data to show"],
  numbers:[0],
  total: 0,
  addPercentage: 0,
  delPercentage: 0,
  changePercentage: 0
}

export const pieData =  (stats) => {
  return {
    datasets: [
      {
        data: stats.numbers,
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
    labels: stats.labels
  };
};

export const filesData = (stats,theme) =>{
  return {
    datasets: [
      {
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        data: stats.numbers,
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
        data: stats.time,
        yAxisID: 'B',
        label: 'Time(s)',
        maxBarThickness: 10,
        barThickness: 12,
        barPercentage: 0.3,
        categoryPercentage: 0.5
      }
    ],
    labels: stats.labels
  };
};

export const lineData = (stats,theme) => {
  return {
    datasets: [
      {
        fill: false,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.secondary.main,
        data: stats.numbers,
        label: 'Daily Metrics'
      }
    ],
    labels: stats.labels
  };
};

export const pieOptions = (theme) => {
  return{
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


export const filesOptions = (theme) => {
  return{
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
};

export const lineOptions = (theme) => {
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
};
