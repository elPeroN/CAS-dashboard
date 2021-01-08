import React from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { gitlabActionsCreator } from "src/redux/actions/Gitlab/gitlabActionsCreator"
import {
  Home as HomeIcon
} from '@material-ui/icons';
import DashPage from 'src/components/DashPage';
import Logo from 'src/components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    border: "4px solid " + theme.palette.primary.main,
    borderRadius: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function NoRepositoryFound(props){
  const classes = useStyles();

   return (
     <DashPage>
      <Container className={classes.root} maxWidth="md">
        <Grid
          container
          spacing={3}
          alignItems="center"
          justify="center"
        >
          <Grid item sm={6} xs={12}>
            <Logo width="100%"/>
          </Grid>
          <Grid
              item
              xs={12}
              sm={6}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              fontSize='4rem'
              fontFamily='monospace'
            >
                Ooops!
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize='6rem'
              letterSpacing='2vw'
              fontFamily='monospace'
            >
                404
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              fontSize='2rem'
              fontFamily='monospace'
            >
                Page Not Found
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                className= {classes.button}
                variant="contained"
                color="primary"
                endIcon={<HomeIcon/>}
                onClick={() => props.history.push('/')}
              >
                Back To Home
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </DashPage>
  );
};

function mapStateToProps(state){
  return {
        gitlabToken: state.gitlab.gitlabToken
  };
};

const actions = {
  gitlabLogout: gitlabActionsCreator.logoutGitlab,
  refresh: gitlabActionsCreator.gitlabFlow
}

export default connect(mapStateToProps,actions)(NoRepositoryFound);
