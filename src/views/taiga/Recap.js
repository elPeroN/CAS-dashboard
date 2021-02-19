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
//import PieChart from './DevelPieChart';
import SelectedMenu from 'src/components/SelectedMenu';
import { fetchGitlabRepositories } from "src/services/gitlab";
import {connect} from 'react-redux';
import {colorsForGraphs} from 'src/theme/colors';

function Recap(props){
    let proj_names = []
    let stories = props.stories
    console.log(stories)
    let last = null

    if(stories) {
        /*
        proj_id,
        subject,
        is_closed,
        user_story,
        user_story_extra_info: {
        	subject,
        	id,
        }
        finished_date , (range di data, seleziono un intervallo in cui mostrare le US terminate da me)
        milestone_slug,
        */
        console.log("Stories found")
        stories.sort( (a,b) => (a.finished_date > b.finished_date) ? 1 : -1)
        // console.log(stories)
        last = stories[stories.length-1]
        console.log(last)
    }


    if (props.projects)
        props.projects.map(x => {
            proj_names.push(x.name)
        })


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
                        Projects: {proj_names.join(', ')}
                    </TableCell>

                    <TableCell>
                        Last completed: {last ? last.subject+` (${last.milestone})` : 'N/A'}
                    </TableCell>
                  </TableRow>

                </TableHead>

              </Table>
            </Card>

            <Divider />

            <Card >
              <CardHeader
                title=
                  <div>
                    Developer details
                    <PieChart stats={devs}/>
                  </div>

              />
            </Card>

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
