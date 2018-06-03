export default {
  dashboard: {},
  locale: { lang: 'en' },
  session: {
    isAuthenticated: false,
    token: null,
    currentUser: null,
    errors: {}
  },
  common: {
    applicationError: {
      isInErrorState: false,
      error: null
    },
    loadingIndicator: {
      isLoading: false
    },
    socket: null
  }
};
