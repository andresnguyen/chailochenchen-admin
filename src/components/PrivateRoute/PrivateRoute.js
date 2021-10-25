import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

function PrivateRoute({ component, path, exact }) {
  const performValidationHere = () => {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
      return false;
    }

    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    if (jwtDecode(ACCESS_TOKEN).exp < Date.now() / 1000) {
      localStorage.removeItem('ACCESS_TOKEN');
      return false;
    }

    return true;
  };

  const condition = performValidationHere();

  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
