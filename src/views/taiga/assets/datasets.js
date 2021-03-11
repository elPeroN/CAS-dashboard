import {colors} from '@material-ui/core';

export const lines = (stats) => {
    return [
        {
            title: 'Tasks assigned',
            value: stats.assigned,
            color: colors.indigo[500]
        },

        {
            title: 'Tasks completed',
            value: stats.completed,
            color: colors.green[600]
        }
    ]
}

export const defaultPieStats = {
    labels:["No data found"],
    numbers:[0],
    assigned: 0,
    completed: 0
}

export const pieData = (stats) => {
    return {
        datasets: [
            {
                data: stats.numbers,
                backgroundColor: [
                    colors.red[600],
                    colors.green[500]
                ],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
            }
        ],
        labels: stats.labels
    }
}

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

export const storiesData = (stats, theme) => {
    return {
      datasets: [
        {
          fill: false,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.secondary.main,
          data: stats.numbers,
          label: 'Stories completed'
        }
      ],
      labels: stats.labels
    }
  }

export const storiesOptions = (theme) => {
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
