import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  InputAdornment,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  PersonOutline as PersonOutlineIcon,
  MailOutline as MailOutlineIcon,
  VpnKey as VpnKeyIcon
} from '@material-ui/icons';
import AuthPage from 'src/components/AuthPage';
import {connect} from 'react-redux';
import {actionsCreator} from "src/redux/actions/actionsCreator"

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

function RegisterView(props){
  const classes = useStyles();

  if(props.state.registered) return(<Redirect to='/login'/>);//TODO: se voglio ritornare a register?
  else return (
    <AuthPage >
      <Container className={classes.root} maxWidth="sm">
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordConfirmation:'',
            policy: false
          }}
          validationSchema={
            Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              firstName: Yup.string().max(255).required('First name is required'),
              lastName: Yup.string().max(255).required('Last name is required'),
              password: Yup.string().max(255).required('password is required'),
              passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirmation is required'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked'),
            })
          }
          onSubmit={(values,act) => {
            props.register(values).then(act.setSubmitting(false));
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
                  Create new account
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Use your email to create new account
                </Typography>
              </Box>
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First name"
                margin="normal"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Last name"
                margin="normal"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
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
              <TextField
                error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                fullWidth
                helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                label="Confirm Password"
                margin="normal"
                name="passwordConfirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.passwordConfirmation}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                alignItems="center"
                display="flex"
                ml={-1}
              >
                <Checkbox
                  checked={values.policy}
                  name="policy"
                  onChange={handleChange}
                />
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  I have read the
                  {' '}
                  <Link
                    color="primary"
                    component={RouterLink}
                    to="#"
                    underline="always"
                    variant="h6"
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              </Box>
              {Boolean(touched.policy && errors.policy) && (
                <FormHelperText error>
                  {errors.policy}
                </FormHelperText>
              )}
              <Box my={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Have an account?
                {' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="h6"
                >
                  Sign in
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </AuthPage>
  );
};

function mapStateToProps(state){
  return {state: state};
};

const actions = {
  register: actionsCreator.register
}

export default connect(mapStateToProps,actions)(RegisterView);
