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
import TaigaIcon from 'src/assets/icons/taiga_icon'
import UserDetail from './UserDetail'
import { connect } from "react-redux";
import { taigaCreator } from 'src/redux/actions/taigaCreator';
import { taigaActions } from 'src/redux/actions/taiga-actions';


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

function UserStats(props) {
    const classes = useStyles();
    let topbar, content

    topbar = (<Card>
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
              <TaigaIcon/>
              Taiga Recap
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
              //onClick={() => props.gitlabLogout()}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )

  if (props.taigaView === "recap")
    content = <UserDetail/>;

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
	  taigaId: state.taigaId
	};
};

const actions = {
	login: taigaCreator.login,
	fetchUserId: taigaCreator.fetchUserId
}

export default connect(mapStateToProps, actions)(UserStats);
