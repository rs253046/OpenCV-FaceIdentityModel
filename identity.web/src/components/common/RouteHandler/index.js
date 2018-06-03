import React from 'react';
import AuthenticatedRoute from '../AuthenticatedRoute';
import UnauthenticatedRoute from '../UnauthenticatedRoute';
import { APP_CONSTANTS } from '../../../constants';
import { PropTypes } from 'prop-types';

const RouteHandler = (props) => {

  let Handler;

  switch (props.type) {
    case APP_CONSTANTS.AUTHENTICATED_ROUTE:
      Handler = AuthenticatedRoute;
      break;
    case APP_CONSTANTS.UNAUTHENTICATED_ROUTE:
      Handler = UnauthenticatedRoute;
      break;
    default:
      Handler = AuthenticatedRoute;
  }

  return <Handler {...props}/>;
};

RouteHandler.propTypes = {
  type: PropTypes.string.isRequired
};

export default RouteHandler;
