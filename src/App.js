import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import { Provider as ReduxProvider } from "react-redux";

import DashboardLayout from 'src/layouts/DashboardLayout/DashboardLayout';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import DashboardView from 'src/views/reports/DashboardView/Dashboard';
import NotFoundView from 'src/views/errors/NotFoundView';

import theme from 'src/theme/theme';
import store from 'src/redux/store/store';

class App extends Component{

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <Router >
            <DashboardLayout >
              <Switch>
                <Route exact path="/">
                  <Redirect to="/app/dashboard" />
                </Route>
                <Route exact path='/app/dashboard' component={DashboardView}/>
                <Route exact path="/login" component={LoginView} />
                <Route exact path="/register" component={RegisterView}/>
                <Route path="/*" component={NotFoundView}/>
              </Switch>
            </DashboardLayout>
          </Router>
        </ReduxProvider>
      </ThemeProvider>
    );
  }
};

export default App;
