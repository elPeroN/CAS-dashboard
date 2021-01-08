import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {loggerActionsCreator} from "src/redux/actions/Logger/loggerActionsCreator";
import {appActions} from "src/redux/actions/App/appActions";
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  MailOutline as MailOutlineIcon,
  VpnKey as VpnKeyIcon
} from '@material-ui/icons';
import Logo from 'src/components/Logo';
import AuthPage from 'src/components/AuthPage';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    border: "4px solid " + theme.palette.primary.main,
    borderRadius: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function LoginView(props){
  const classes = useStyles();

 return (
  <AuthPage>
    <Container className={classes.root} maxWidth="md">
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
      >
        <Grid item sm={6} >
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
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
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
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
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Logo width="100%"/>
        </Grid>
      </Grid>
    </Container>
  </AuthPage>
  );
};

function mapStateToProps(state){
  return {state: state};
};

const actions = {
  login: loggerActionsCreator.login,
  loggedFlow: loggerActionsCreator.loggedFlow,
  sendNotification: appActions.sendNotification,
}

export default connect(mapStateToProps,actions)(LoginView);
