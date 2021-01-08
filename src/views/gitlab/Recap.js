import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import {
  DataUsage as CircleIcon,
  ArrowForwardIos as ArrowForwardIosIcon
} from "@material-ui/icons";
import PieChart from './DevelPieChart';
import SelectedMenu from 'src/components/SelectedMenu';
import { fetchGitlabRepositories } from "src/services/gitlab"
import {connect} from 'react-redux';
import {colorsForGraphs} from 'src/theme/colors';

import {gitlabActionsCreator} from "src/redux/actions/Gitlab/gitlabActionsCreator";
import {gitlabActions} from "src/redux/actions/Gitlab/gitlabActions";


function Recap(props){

  const [devs, setDevs] = useState(
    [{
    key:"key",
    name:"",
    commits:0
  }]
  );

  let menu = props.gitlabRepos.map( item => item.name);

  useEffect(() => {
    if(props.gitlabRepos){
      let route = props.gitlabRepos[props.gitlabMenuIndex]._links.self+"/repository/contributors" ;
      props.setRepositoryIndex(props.gitlabRepos[props.gitlabMenuIndex].id);
      fetchGitlabRepositories(props.gitlabToken, route).then( response =>{
        let filtered = response.data.filter( (item,i) =>{
          item["key"] = uuid();
          item["color"] = colorsForGraphs[i];
          return item;
        })
        setDevs(filtered);
      })
    }
  },[props]);

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
          <PieChart stats={devs}/>
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
            title="Developers Stats"
            action={<SelectedMenu
                       list={menu}
                       index={props.gitlabMenuIndex}
                       setSelectedIndex={props.setGitlabMenuIndex}
                     />}
          />
          <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Developer
                  </TableCell>
                  <TableCell>
                    Commits
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devs.map((dev,i) => (
                  <TableRow
                    hover
                    key={dev.key}
                  >
                    <TableCell>
                      {dev.name}
                    </TableCell>
                    <TableCell>
                      {dev.commits}
                    </TableCell>
                    <TableCell>
                    <CircleIcon style={{color: dev.color}}/>
                    </TableCell>
                    <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowForwardIosIcon/>}
                        onClick={ () => props.getDevelStats(props.gitlabToken,dev.name)}
                      > Details </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    );
  };

function mapStateToProps(state){
  return {
    gitlabToken: state.gitlab.gitlabToken,
    gitlabRepos: state.gitlab.gitlabRepos,
    gitlabMenuIndex: state.gitlab.gitlabMenuIndex
  };
};

const actions = {
    setGitlabMenuIndex: gitlabActions.setGitlabMenuIndex,
    getDevelStats: gitlabActionsCreator.getDevelStats,
    setRepositoryIndex: gitlabActions.setRepositoryIndex
}

export default connect(mapStateToProps,actions)(Recap);
