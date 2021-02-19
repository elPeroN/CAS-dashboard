import {colors} from '@material-ui/core';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
  Edit as EditIcon
} from '@material-ui/icons';

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
            color: colors.red[600]
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
                    colors.indigo[500],
                    colors.red[600]
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
