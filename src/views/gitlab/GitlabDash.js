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

import GitlabIcon from 'src/assets/icons/GitlabIcon'
import Recap from './Recap';
import Devel from './Devel';
import NoRepositoryFound from './NoRepositoryFound';

import { connect } from "react-redux";
import { gitlabActions } from 'src/redux/actions/Gitlab/gitlabActions';
import { gitlabCreator } from "src/redux/actions/Gitlab/gitlabCreator";

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

function GitlabDash(props) {
  const classes = useStyles();

  let content;

  if(!props.gitlabRepos) content = <NoRepositoryFound/>;
  else if(props.gitlabView === "recap") content = <Recap/>;
  else if(props.gitlabView === "devel") content = <Devel/>;

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
                      Gitlab Recap
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
                        onClick={() => props.gitlabLogout()}
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
};

function mapStateToProps(state){
  return {
    gitlabRepos: state.gitlab.gitlabRepos,
    gitlabMenuIndex: state.gitlab.gitlabMenuIndex,
    gitlabView: state.gitlab.gitlabView
  };
};

const actions = {
  setRepositoryIndex: gitlabActions.setRepositoryIndex,
  setGitlabMenuIndex: gitlabActions.setGitlabMenuIndex,
  setGitlabView: gitlabActions.setGitlabView,
  gitlabLogout: gitlabCreator.logoutGitlab
}

export default connect(mapStateToProps,actions)(GitlabDash);
