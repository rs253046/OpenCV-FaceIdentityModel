import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionAction, commonAction } from '../../../actions';
import { APP_ROUTES } from '../../../constants';
import { PropTypes } from 'prop-types';
import { FormatMessage } from '../../common';
import LoginForm from './LoginForm';
import { Button } from 'reactstrap';
import io from 'socket.io-client';
import './index.css';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.socket = io.connect('http://localhost:3000');
    this.login = this.login.bind(this);
  }


  componentWillUnmount() {
    this.socket.emit('stopRecognitionStreaming');
    this.socket.disconnect();
  }

  login(event) {
    this.socket.emit('startRecognitionStreaming');
    setTimeout(() => {
      this.props.actions.showLoader();
      this.socket.emit('startRecognitionCapturing');
    });
    this.socket.on('recognizedPerson', (data) => {
      this.socket.emit('stopRecognitionStreaming');
      this.socket.disconnect();
      this.props.actions.login({
        username: data.prediction,
        password: 'identity'
      });
      this.props.actions.hideLoader();
    });
  }

  logout() {
    this.props.actions.logout();
  }

  generateLayout() {
    const { session } = this.props;
    const error = session.errors.loginFailed;
    if (error) {
      this.props.actions.hideLoader();
    }

    return (
      <div className="loginContainer clearfix p-8 vh">
        <div className="gradient-effect" />
        <div className="w-30 mt-13">
          <div className="mb-5">
            <h1>Face Identity</h1>
          </div>
          <Button type="submit" block onClick={this.login}>Login</Button>
          <h6 className="text-danger">{error}</h6>
          <div>
            <Link to={APP_ROUTES.REGISTRATION.STEP_1}>
              Click here to register yor identity.
            </Link>
          </div>
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
    actions: bindActionCreators({ ...sessionAction, ...commonAction }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
