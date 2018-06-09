import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import { RouteHandler, ErrorBoundary, LoadingIndicator, HeaderBar, FooterBar } from '../components/common';
import routes from '../routes';
import { APP_ROUTES } from '../constants';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import messages from '../translations';
import { commonAction } from '../actions';
import { HttpService } from '../services';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.setupLoadingIndicator(props);
  }

  setupLoadingIndicator({ actions }) {
    HttpService.httpLoadingEvent.subscribe((loadingEvent) => {
      loadingEvent.isHttpLoading ? actions.showLoader() : actions.hideLoader();
    });
  }

  generateLayout() {
    const { lang } = this.props;
    return (
      <ErrorBoundary>
        <IntlProvider locale={lang} messages={messages(lang)}>
          <Router>
            {this.renderContainer()}
          </Router>
        </IntlProvider>
      </ErrorBoundary>
    );
  }

  renderContainer() {
    const { session } = this.props;
    return (
      <div className="app-container">
        { session.isAuthenticated && <HeaderBar currentUser={session.currentUser}/> }
        { this.renderRoutes() }
        { session.isAuthenticated && <FooterBar/> }
      </div>
    );
  }

  renderRoutes() {
    const { session, isLoading } = this.props;

    const routesToRender = [
      this.handleRootRedirection(),
      ...routes.map((route, i) => <RouteHandler key={i} {...route} session={session}/>)
    ];

    if (isLoading) {
      routesToRender.unshift(<LoadingIndicator isLoading={isLoading} key={'loading-indicator'}/>);
    }

    return routesToRender;
  }

  handleRootRedirection() {
    return (
      <Route
        key={'rootRedirection'}
        exact
        path={APP_ROUTES.ROOT}
        render={this.getRedirectHandler}
      />
    );
  }

  getRedirectHandler() {
    return <Redirect to={APP_ROUTES.DASHBOARD}/>;
  }

  render() {
    return this.generateLayout();
  }
}

function mapStateToProps(state, ownProps) {
  return {
    lang: state.locale.lang,
    session: state.session,
    isLoading: state.common.loadingIndicator.isLoading
  };
}

App.propTypes = {
  lang: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
