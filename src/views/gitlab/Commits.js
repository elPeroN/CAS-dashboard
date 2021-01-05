import React from 'react';
import {
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
//TODO: unire gitlabPage.js con Commits.js
import GitlabIcon from 'src/assets/icons/GitlabIcon'
import Recap from './Recap';
import Devel from './Devel';

import { connect } from "react-redux";
import {actionsCreator} from 'src/redux/actions/actionsCreator';
import {userActions} from 'src/redux/actions/actions';


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

function  Commits(props) {
  const classes = useStyles();
  let topbar;
  let content;

  topbar= (<Card>
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
          <Button
            className= {classes.button}
            variant="contained"
            color="secondary"
            endIcon={<ExitToAppIcon/>}
            onClick={() => props.gitlabLogout()}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)

if(props.gitlabView === "recap") content = <Recap/>;
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
            {topbar}
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
    gitlabRepos: state.gitlabRepos,
    gitlabMenuIndex: state.gitlabMenuIndex,
    gitlabView: state.gitlabView
  };
};

const actions = {
  setRepositoryIndex: userActions.setRepositoryIndex,
  setGitlabMenuIndex: userActions.setGitlabMenuIndex,
  setGitlabView: userActions.setGitlabView,
  gitlabLogout: actionsCreator.logoutGitlab
}

export default connect(mapStateToProps,actions)(Commits);
