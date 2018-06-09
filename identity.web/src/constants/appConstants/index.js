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
    EMAIL: '^[^\s@]+@[^\s@]+\.[^\s@]+$' //eslint-disable-line no-useless-escape
  }
};

export default APP_CONSTANTS;
