import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const AuthenticatedRoute = (props) => {

  const render = subProps => ( //eslint-disable-line react/no-multi-comp
    props.session.isAuthenticated ?
      (<props.component {...subProps} routes={props.routes} />) :
      (<Redirect to={{ pathname: '/login', state: { from: subProps.location }}}/>)
  );

  return <Route path={props.path} render={render}/>;

};

AuthenticatedRoute.propTypes = {
  session: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }),
  routes: PropTypes.object,
  path: PropTypes.string.isRequired
};

export default AuthenticatedRoute;
