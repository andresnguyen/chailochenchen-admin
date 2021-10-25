import { ThemeProvider } from '@material-ui/core';
import 'assets/css/material-dashboard-react.css?v=1.9.0';
import { createBrowserHistory } from 'history';
import Admin from 'layouts/Admin.js';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import theme from 'theme/theme';
import Login from './views/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const hist = createBrowserHistory();

const App = (
  <Router history={hist}>
    <Switch>
      <PrivateRoute path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      {App}
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
