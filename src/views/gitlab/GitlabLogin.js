import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import Help from './Help';
import HelpIcon from '@material-ui/icons/Help';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import GitlabIcon from 'src/assets/icons/GitlabIcon';
import {connect} from 'react-redux';
import {gitlabCreator} from "src/redux/actions/Gitlab/gitlabCreator";
import {config} from "src/services/config.js";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.dark,
    border: "4px solid " + theme.palette.primary.main,
    borderRadius: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function GitlabLogin(props){
  const classes = useStyles();
  return (
        <Container className={classes.root} maxWidth="sm">
          <Formik
            initialValues={{
              token: ''
            }}
            validationSchema={Yup.object().shape({
              token: Yup.string().max(20).required('Personal Token is required'),
            })}
            onSubmit={(values,act) => {
              props.login(values).then(act.setSubmitting(false));
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Gitlab Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.token && errors.token)}
                  fullWidth
                  label="Personal Token"
                  margin="normal"
                  name="token"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.token}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FingerprintIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have a Token? Request it on
                  {' '}

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => window.location = `${config.URL}/gitlab/users/sign_up`}
                    startIcon={<GitlabIcon/>}
                  >
                    Gitlab
                  </Button>
                  <IconButton aria-label='help'>
                    <Tooltip
                      placement="right"
                      title={<Help/>}
                    >
                      <HelpIcon/>
                    </Tooltip>
                  </IconButton>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
  );
}

const actions = {
  login: gitlabCreator.loginGitlab
}

export default connect(null, actions)(GitlabLogin);
