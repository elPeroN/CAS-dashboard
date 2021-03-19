import React from 'react';
import {connect} from 'react-redux';
import {
  Card,
  Button,
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
import {
  ArrowForwardIos as ArrowForwardIosIcon,
  Refresh as RefreshIcon
} from "@material-ui/icons";
import {sonarCreator} from 'src/redux/actions/Sonar/creator';

import {measure, q_gate} from './assets/utils';

function Recap(props){
    let projects = [];

    if (props.projects) {
        projects = props.projects
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
                      Username : {props.username}
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



          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Project
                </TableCell>
                <TableCell>
                  Quality Gate
                </TableCell>
                <TableCell>
                  Last analysis
                </TableCell>
                <TableCell>
                    Technical debt
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {projects.map( P => (
                <TableRow
                  hover
                  key={P.key}
                >
                  <TableCell>
                    {P.name}
                  </TableCell>

                  <TableCell>
                      {q_gate(P.quality_gate)}
                  </TableCell>

                  <TableCell>
                      {P.last_analysis.split('T')[0]}
                  </TableCell>

                  <TableCell>
                      {measure(P.debt)}
                  </TableCell>

                  <TableCell>
                  <Button
                      variant="contained"
                      color="primary"
                      href={P.address}
                      endIcon={<ArrowForwardIosIcon/>}
                      onClick={ () => null}
                    > Details </Button>
                  </TableCell>
                </TableRow>
            ))}
            </TableBody>
            </Table>


        </Grid>
    </Grid>
    );

}

function mapStateToProps(state){
    return {
        token: state.sonar.token,
        username: state.sonar.username,
        projects: state.sonar.projects,
        measure: state.sonar.measure
    }
}

const actions = {
    refresh: sonarCreator.refresh
}

export default connect(mapStateToProps, actions)(Recap)
