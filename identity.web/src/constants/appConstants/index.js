const APP_CONSTANTS = {
  AUTHENTICATED_ROUTE: 'authenticatedRoute',
  UNAUTHENTICATED_ROUTE: 'unauthenticatedRoute',
  ENVIRONMENT: {
    PRODUCTION: 'production',
    TESTING: 'testing',
    STAGING: 'staging',
    DEVELOPMENT: 'development'
  },
  HTTP: {
    METHOD: {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE'
    }
  },
  REG_EXP: {
    EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }
};

export default APP_CONSTANTS;
