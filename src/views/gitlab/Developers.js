import React, { useState, useEffect } from 'react';
import {
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
import {DataUsage as CircleIcon} from "@material-ui/icons";
import PieChart from './DevelPieChart';
import { fetchGitlab } from "src/services/gitlab"
import {connect} from 'react-redux';
import {colorsForGraphs} from 'src/theme/colors';

function Developers(props){

  const [devs, setDevs] = useState(
    [{
    key:"key",
    name:"",
    commits:0
  }]
  );

  useEffect(() => {
    if(props.gitlabRepos){
      let route = props.gitlabRepos[props.gitlabIndex]._links.self+"/repository/contributors" ;
      fetchGitlab(props.gitlabToken, route).then( response =>{
        let filtered = response.data.filter( (item,i) =>{
          item["key"] = uuid();
          item["color"] = colorsForGraphs[i];
          return item;
        })
        setDevs(filtered);
      })
    }
  },[props.gitlabIndex,props.gitlabRepos,props.gitlabToken]);

  return (

        <Grid
          container
          spacing={3}
        >
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={9}
        >
        <Card      >
        <CardHeader title="Developers Stats" />
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
                  <TableCell >
                    Additions
                  </TableCell>
                  <TableCell>
                    Deletions
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
                      {dev.additions}
                    </TableCell>
                    <TableCell>
                      {dev.deletions}
                    </TableCell>
                    <TableCell>
                      <CircleIcon style={{color: dev.color}}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
          >
          <PieChart stats={devs}/>
          </Grid>
          </Grid>
    );
  };

function mapStateToProps(state){
  return {
    gitlabToken: state.gitlabToken,
    gitlabRepos: state.gitlabRepos,
    gitlabIndex: state.gitlabIndex
  };
};

export default connect(mapStateToProps)(Developers);
