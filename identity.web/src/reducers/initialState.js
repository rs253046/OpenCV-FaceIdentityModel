export default {
  dashboard: {},
  locale: { lang: 'en' },
  session: {
    isAuthenticated: false,
    token: null,
    currentUser: null,
    errors: {}
  },
  registration: {
    registration: {},
    currentStep: 1,
    error: {}
  },
  common: {
    applicationError: {
      isInErrorState: false,
      error: null
    },
    loadingIndicator: {
      isLoading: false
    }
  }
};
