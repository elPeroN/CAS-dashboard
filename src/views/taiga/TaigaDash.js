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

import GitlabIcon from 'src/assets/icons/TaigaIcon'
import Recap from './Recap';
import NoRepositoryFound from '../gitlab/NoRepositoryFound';

import { connect } from "react-redux";
import { taigaActions } from 'src/redux/actions/Taiga/actions';
import { taigaCreator } from "src/redux/actions/Taiga/creator";


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

function TaigaDash(props){
    const classes = useStyles();

    let content;

    if(!props.taigaProjects)
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
                        <GitlabIcon/>
                        Taiga Recap
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
                          onClick={() => props.taigaLogout()}
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
        taigaProjects: state.taiga.taigaProjects,
        taigaUStories: state.taiga.taigaUStories,
        taigaRoles: state.taiga.taigaRoles
    }
}

// const actions = {
//         taigaLogout: taiga
// }
export default connect(mapStateToProps, null)(TaigaDash);
