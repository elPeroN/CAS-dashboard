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
} from '@material-ui/icons';

import MattermostIcon from 'src/assets/icons/MattermostIcon';
import {connect} from 'react-redux';
import {mattermostCreator} from "src/redux/actions/Mattermost/mattermostCreator"

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function MattermostLogin(props){
  const classes = useStyles();
  return (
        <Container className={classes.root} maxWidth="sm">
        <Formik
          initialValues={{
            login_id: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            login_id: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
          })}
          onSubmit={(values,act) => {
            props.login(values).then(
              act.setSubmitting(false));
              props.close();
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
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Sign in on the internal platform
                </Typography>
              </Box>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="login_id"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.login_id}
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
                helperText={touched.password && errors.password}
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
                  Don&apos;t have an account? Register on
                  {' '}

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => window.location = "http://localhost:1080/login"}
                    startIcon={<MattermostIcon/>}
                  >
                    Mattermost
                  </Button>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
  );
};

const actions = {
  login: mattermostCreator.loginMattermost
}

export default connect(null, actions)(MattermostLogin);
