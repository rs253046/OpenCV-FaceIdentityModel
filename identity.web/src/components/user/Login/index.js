import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionAction } from '../../../actions';
import { PropTypes } from 'prop-types';
import { FormatMessage } from '../../common';
import LoginForm from './LoginForm';
import { Button } from 'reactstrap';
import io from 'socket.io-client';
import './index.css';

class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.socket = io.connect('http://localhost:3000');
    this.socket.emit('startRecognitionStreaming');
    this.login = this.login.bind(this);
  }


  componentWillUnmount() {
    this.socket.emit('stopRecognitionStreaming');
    this.socket.disconnect();
  }

  login(event) {
    this.socket.emit('startRecognitionCapturing');
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
          <Button type="submit" block onClick={this.login}>Login</Button>
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
