import React from 'react';
import {connect} from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  Typography
} from '@material-ui/core';

import { createPieStats } from './assets/utils';
import { pieData, pieOptions } from './assets/datasets';

function PieChart(props) {
    const theme = useTheme();
    let percentage = 0
    let stats = {
        labels: ["No data to show"],
        numbers: [0]
    }

    if (props.stats){
        stats = createPieStats(props.stats)
        percentage = props.stats.numbers[1]/props.stats.numbers[0]*100
    }

    return(
        <Card>
            <CardHeader title="Stories & Tasks completed" />
            <Divider/>
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
                        <Box
                          key="percentage"
                          p={1}
                          textAlign="center"
                        >
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            Stories completed
                          </Typography>
                          <Typography
                            variant="h2"
                          >
                            {percentage.toFixed(1)}
                            %
                          </Typography>
                        </Box>
                    </Box>
            </CardContent>
        </Card>
    );
}

function mapStateToProps(state){
    return {
        stories: state.gitlab.stories
    }
}

export default connect(mapStateToProps)(PieChart);
