import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { commonAction, sessionAction } from '../../../actions';
import config from '../../../config/environment';

class ErrorBoundary extends Component {
  constructor(props, context) {
    super(props, context);
    this.registerErrorHandler();
  }

  registerErrorHandler() {
    window.onerror = (message, source, lineno, colno, error) => {
      if (config.environment !== 'production') {
        // console.error('errorObbject', message, source, lineno, colno, error); // eslint-disable-line no-console
      }

      this.props.actions.setApplicationErrorState({
        error: { message, source, lineno, colno, error },
        isInErrorState: !!error
      });

      this.props.actions.hideLoader();

      this.handerErrors(this.props.applicationError);

      return false;
    };
  }

  handerErrors(applicationError) {
    if (applicationError.isInErrorState && applicationError.error.error &&
       applicationError.error.error.status) {
      const status = applicationError.error.error.status;
      switch(status) {
        case 401: // eslint-disable-line no-magic-numbers
          this.props.actions.logout();
          break;
        default:

      }
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    applicationError: state.common.applicationError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...sessionAction, ...commonAction }, dispatch)
  };
}

ErrorBoundary.propTypes = {
  applicationError: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
