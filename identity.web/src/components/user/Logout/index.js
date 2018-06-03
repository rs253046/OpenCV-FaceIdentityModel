import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionAction } from '../../../actions';
import { PropTypes } from 'prop-types';

class Logout extends Component {

  constructor(props, context) {
    super(props, context);
    this.logout();
  }

  logout() {
    this.props.actions.logout();
  }

  render() {
    return <div />;
  }
}
Logout.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
