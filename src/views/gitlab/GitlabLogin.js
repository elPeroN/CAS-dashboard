import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import {connect} from 'react-redux';
import {actionsCreator} from "src/redux/actions/actionsCreator"

function LoginView(props){

  return (
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
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
                  label="PERSONAL TOKEN"
                  margin="normal"
                  name="token"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.token}
                  variant="outlined"
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
                  <Button
                    onClick={() => window.location = "http://localhost:8929/users/sign_up"}
                  >
                    Sign up
                  </Button>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
  );
};

function mapStateToProps(state){
  return {state: state};
};

const actions = {
  login: actionsCreator.loginGitlab,
}

export default connect(mapStateToProps,actions)(LoginView);
