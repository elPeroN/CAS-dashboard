import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

import {
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import SonarQubeIcon from "src/assets/icons/SonarQube"
import Recap from './Recap'
import NoRepositoryFound from '../gitlab/NoRepositoryFound';
import { connect } from "react-redux";
import {sonar} from 'src/redux/actions/Sonar/actions'
import { sonarCreator } from 'src/redux/actions/Sonar/creator'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function SonarDash(props){
    const classes = useStyles()
    let content

    if(!props.projects)
        content = <NoRepositoryFound/>
    else
        content = <Recap/>

    return (
        <Container maxWidth={false} className= {classes.root}>
          <Grid
            container
            spacing={3}
          >
            <Grid item
              xs={12}
              sm={12}
              md={12}
            >
            <Card>
                <CardContent>
                  <Grid
                    direction="row"
                    container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item
                      xs={12}
                      sm={6}
                      md={9}
                    >
                      <Typography variant="h3">
                        <SonarQubeIcon/>
                            Sonar Recap
                      </Typography>
                    </Grid>
                    <Grid item
                      xs={12}
                      sm={6}
                      md={3}
                    >
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Button
                          className= {classes.button}
                          variant="contained"
                          color="secondary"
                          endIcon={<ExitToAppIcon/>}
                          onClick={() => null}
                        >
                          Logout
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
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
              {content}
            </Grid>
          </Grid>
        </Container>
    )
}

function mapStateToProps(state){
    return {
        projects: state.sonar.projects,
        roles: state.sonar.roles,
        username: state.sonar.username
    }
}
const actions = {
    setProjects: sonarCreator.setProjects,
    setDetails: sonarCreator.setDetails
}
export default connect(mapStateToProps, actions)(SonarDash)
