import React from 'react';
import {connect} from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  useTheme
} from '@material-ui/core';
import {gitlabActions} from 'src/redux/actions/Gitlab/gitlabActions'
import { createDevelStats } from "./assets/utils";
import {
  defaultDevel,
  develData,
  develOptions
} from './assets/datasets';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

function Devel(props){
  const theme = useTheme();
  const classes = useStyles();
  let devel;

  if (props.develStats){devel = createDevelStats(props.develStats)}
  else devel = defaultDevel;

  return(
    <React.Fragment>
      <Card>
        <CardHeader
          title={devel.author}
          action={<Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={()=> props.setGitlabView('recap')}
                    >Indietro
                  </Button>}
          />
        <Divider />
        <CardContent>
          <Box
            height={400}
            position="relative"
          >
            <Bar
              data={develData(devel,theme)}
              options={develOptions(theme)}
            />
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

function mapStateToProps(state){
  return {
    develStats: state.gitlab.develStats
  };
}

const actions = {
  setGitlabView: gitlabActions.setGitlabView
}

export default connect(mapStateToProps,actions)(Devel);
