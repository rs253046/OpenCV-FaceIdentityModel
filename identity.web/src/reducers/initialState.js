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
    step1: {},
    step2: {},
    currentStep: 1
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
