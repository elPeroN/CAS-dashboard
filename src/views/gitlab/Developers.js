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
import PieChart from './DevelPieChart';
import { fetchGitlab } from "src/services/gitlab"
import {connect} from 'react-redux';

function Developers(props){

  const [devs, setDevs] = useState(
    [{key:"",
    name:"",
    commits:0}]
  );

  useEffect(() => {
    if(props.gitlabRepos){
      let route = props.gitlabRepos[props.gitlabIndex]._links.self+"/repository/contributors" ;
      fetchGitlab(props.gitlabToken, route).then( response =>{
        setDevs(response.data);
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
          lg={6}
          xs={12}
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
                </TableRow>
              </TableHead>
              <TableBody>
                {devs.map((dev,i) => (
                  <TableRow
                    hover
                    key={i}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Card>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
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
