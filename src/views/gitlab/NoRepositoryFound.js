import React from 'react';
import {connect} from 'react-redux';
import {gitlabCreator} from "src/redux/actions/Gitlab/gitlabCreator"
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  ExitToApp as ExitToAppIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';
import GitlabIcon from 'src/assets/icons/GitlabIcon'
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
            justifyContent="center"
          >
            <GitlabIcon width="80%"/>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            variant="h3"
            align="center"
          >
          No repositories found
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Box
            display="flex"
            justifyContent="center"
          >
            <Button
              className= {classes.button}
              variant="contained"
              color="primary"
              endIcon={<RefreshIcon/>}
              onClick={() => props.refresh(props.token)}
            >
              Refresh
            </Button>
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
    </Container>
  );
};

function mapStateToProps(state){
  return {
        token: state.gitlab.gitlabToken
  };
};

const actions = {
  gitlabLogout: gitlabCreator.logoutGitlab,
  refresh: gitlabCreator.gitlabFlow
}

export default connect(mapStateToProps,actions)(NoRepositoryFound);
