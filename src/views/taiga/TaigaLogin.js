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
import {
  MailOutline as MailOutlineIcon,
  VpnKey as VpnKeyIcon
} from '@material-ui/icons'

import TaigaIcon from 'src/assets/icons/TaigaIcon';
import {connect} from 'react-redux';
import { taigaCreator } from "src/redux/actions/Taiga/creator"
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

function LoginView(props){
  const classes = useStyles();

  return (
        <Container className={classes.root} maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(32).required('Username is required'),
              password: Yup.string().max(20).required('Passowrd is required')
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
                    Taiga Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  label="E-mail Address"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
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
                  Don&apos;t have an Account? Register on
                  {' '}

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => window.location = `${config.URL}:${config.TAIGA_PORT_NUMBER}/register`}
                    startIcon={<TaigaIcon/>}
                  >
                    Taiga
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
  login: taigaCreator.login,
}

export default connect(mapStateToProps,actions)(LoginView);
