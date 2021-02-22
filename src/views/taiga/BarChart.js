import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme
} from '@material-ui/core';

import { createFileStats, createBarStats } from './assets/utils';
import {storiesData, storiesOptions } from './assets/datasets'

function LineChart(props) {
    const theme = useTheme()
    let stats

    if (props.stories)
        stats = createBarStats(props.stories)
    else
        stats = {
            numbers: [0],
            labels: ["No stories or tasks found"],
            time: [0]
        }


    return (
        <Card>
            <CardHeader title="Last week completed"/>
            <Divider/>
            <CardContent>
                <Box
                    height={400}
                    position="relative"
                  >
                    <Line
                      data={storiesData(stats,theme)}
                      options={storiesOptions(theme)}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

function mapStateToProps(state){
    return {
        stories: state.taiga.stories
    }
}

export default connect(mapStateToProps)(LineChart);
