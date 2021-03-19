import React from 'react';
import {connect} from 'react-redux';
import {
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import {
  Refresh as RefreshIcon
} from "@material-ui/icons";
import PieChart from './StoriesPieChart';
import LineChart from './BarChart';
import {taigaCreator} from 'src/redux/actions/Taiga/creator';

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
        props.projects.forEach(x => {
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
                    onClick={()=>props.refresh()}
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
                      Roles: {props.roles}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                        Projects:
                        <ol>
                            {
                                projects.map( (el ,i) => {
                                    return <li key={i}><a href={el.address}> {el.name} </a></li>
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
        token: state.taiga.taigaToken,
        user: state.taiga.user,
        projects: state.taiga.projects,
        stories: state.taiga.stories,
        roles: state.taiga.roles
    }
}

const actions = {
    refresh: taigaCreator.refresh
}

export default connect(mapStateToProps, actions)(Recap);
