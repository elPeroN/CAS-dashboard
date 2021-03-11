import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
//import Help from './Help';
//import HelpIcon from '@material-ui/icons/Help';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import SonarQubeIcon from 'src/assets/icons/SonarQube';
import {connect} from 'react-redux';
import { sonarCreator } from "src/redux/actions/Sonar/creator"

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

function LoginView(props){
  const classes = useStyles();

  return (
        <Container className={classes.root} maxWidth="sm">
          <Formik
            initialValues={{
              token: 'JustSubmit',
            }}
            validationSchema={Yup.object().shape({
              token: Yup.string().max(32).required('Username is required'),
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
                    SonarQube Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  label="Token"
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
                    //onClick={() => window.location = "http://localhost:8929/users/sign_up"}
                    startIcon={<SonarQubeIcon/>}
                  >
                    SonarQube
                  </Button>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
  );
};

function mapStateToProps(state){
  return {state: state};
};

const actions = {
  login: sonarCreator.login,
}

export default connect(mapStateToProps,actions)(LoginView);
