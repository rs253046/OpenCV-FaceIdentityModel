import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionAction } from '../../../actions';
import { PropTypes } from 'prop-types';
import { FormatMessage } from '../../common';
import LoginForm from './LoginForm';
import './index.css';

class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.updateUserState = this.updateUserState.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      user: { username: '', password: '' }
    };
  }

  updateUserState(event) {
    const field = event.target.name;
    const { user } = this.state;
    user[field] = event.target.value;

    this.setState(prevUser => {
      return Object.assign({}, prevUser, user);
    });
  }

  login(event) {
    event.preventDefault();

    if (this.loginFormIsValid()) {
      this.props.actions.login(this.state.user);
    }
  }

  loginFormIsValid() {
    const { user } = this.state;
    this.props.actions.clearSessionError();
    let formIsValid = true;
    const errors = {};

    if (user.username.length < 1) {
      formIsValid = false;
      errors.username = 'username is required.';
    }

    if (user.password.length < 1) {
      formIsValid = false;
      errors.password = 'password is required.';
    }

    this.props.actions.setSessionError(errors);

    return formIsValid;
  }

  logout() {
    this.props.actions.logout();
  }

  generateLayout() {
    const { session } = this.props;

    return (
      <div className="loginContainer clearfix p-8 vh">
        <div className="gradient-effect" />
        <div className="w-30 mt-13">
          <div className="mb-5">
            <h1>Identity</h1>
          </div>
          <LoginForm onChange={this.updateUserState} user={this.state.user} errors={session.errors}
            onSubmit={this.login} />
        </div>
      </div>
    );
  }

  render() {
    return this.generateLayout();
  }
}

function mapStateToProps(state, ownProps) {
  return { session: state.session };
}

Login.propTypes = {
  session: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
