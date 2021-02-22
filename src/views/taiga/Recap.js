import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import {
  DataUsage as CircleIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Refresh as RefreshIcon
} from "@material-ui/icons";
import SelectedMenu from 'src/components/SelectedMenu';
import PieChart from './StoriesPieChart';
import LineChart from './BarChart'
import {connect} from 'react-redux';

import {colorsForGraphs} from 'src/theme/colors';
import {sortUserStories,
        isClosed,
        completedStories} from './assets/utils'

function Recap(props){
    let projects = []
    let stories = props.stories
    let tot_completed = 0
    let last = null
    let stats = null

    if(stories) {

        tot_completed = completedStories(stories)
        stories = sortUserStories(stories)
        let closedStories = stories.filter(isClosed)
        last = closedStories[closedStories.length-1]
        stats = {
            labels: ["tot", "completed"],
            numbers: [stories.length, tot_completed]
        }
    }

    if (props.projects){
        console.debug(props.projects)
        props.projects.map(x => {
            let p = {
                name: x.name,
                address: x.address
            }
            projects.push(p)
        })
    }


    return (
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <PieChart stats={stats}/>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
          <Card >
            <CardHeader
              title=
                <div>
                  Developer details
                  <IconButton aria-label="refresh"
                    onClick={()=>props.refresh(props.token)}
                  >
                    <RefreshIcon
                      color="primary"
                      fontSize="large"
                    />
                  </IconButton>
                </div>

            />

            <Divider />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Username : {props.user}
                    </TableCell>
                    <TableCell>
                      Roles: {props.roles.join(', ')}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                        Projects:
                        <ol>
                            {
                                projects.map( el => {
                                    return <li><a href={el.address}> {el.name} </a></li>
                                })
                            }
                        </ol>
                    </TableCell>

                    <TableCell>
                        Last completed: {last ? last.subject+` ${last.milestone ? "from "+last.milestone : ""}` : 'N/A'}
                    </TableCell>
                  </TableRow>

                </TableHead>

              </Table>
            </Card>

          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <LineChart stats={stats}/>
        </Grid>
    </Grid>
        );
}

function mapStateToProps(state){
    return {
        token: state.taiga.token,
        user: state.taiga.user,
        projects: state.taiga.projects,
        stories: state.taiga.stories,
        roles: state.taiga.roles
    }
}

const actions = {
    refresh: null
}

export default connect(mapStateToProps, actions)(Recap);
