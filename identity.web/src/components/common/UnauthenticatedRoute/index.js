import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const UnauthenticatedRoute = (props) => {

  const render = subProps => ( //eslint-disable-line react/no-multi-comp
    props.session.isAuthenticated ?
      (<Redirect to={{ pathname: '/', state: { from: subProps.location }}}/>) :
      (<props.component {...subProps} routes={props.routes} />)
  );

  return <Route path={props.path} render={render}/>;

};

UnauthenticatedRoute.propTypes = {
  session: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }),
  routes: PropTypes.object,
  path: PropTypes.string.isRequired
};

export default UnauthenticatedRoute;
