import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionAction, commonAction } from '../../../actions';
import { APP_ROUTES } from '../../../constants';
import { PropTypes } from 'prop-types';
import { Webcam } from '../../common';
// import LoginForm from './LoginForm';
import { Button } from 'reactstrap';
import './index.css';
import { Link } from 'react-router-dom';
import { HttpService } from '../../../services';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.recognitionData = [];
    this.login = this.login.bind(this);
    this.onSnap = this.onSnap.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState(props) {
    return {
      turnOff: false,
      turnOn: false,
      snapCount: 0
    };
  }

  componentWillUnmount() {
    this.turnOff();
  }

  captureImageSet() {
    this.recognitionData = [];
    this.props.actions.showLoader();
    this.turnOn();

    let count = 50;
    const interval = setInterval(() => {

      if (count < 1) {
        this.recognizeIdentity();
        this.turnOff();
        clearInterval(interval);
      }

      this.takeSnap();
      count--;
    }, 100);

  }

  recognizeIdentity() {
    const payload = { data: this.recognitionData };
    HttpService.post('recognizePhotoBooth/recognizeStream', payload).subscribe((res) => {
      this.props.actions.login({
        username: res.prediction && res.prediction.label,
        password: 'identity'
      });
    }, error => {
      this.props.actions.hideLoader();
    });
  }

  login() {
    this.captureImageSet();
  }

  logout() {
    this.props.actions.logout();
  }

  turnOn() {
    this.setState({
      turnOn: true,
      turnOff: false,
      snapCount: 0
    });
  }

  turnOff() {
    this.setState({
      turnOff: true,
      turnOn: false,
      snapCount: 0
    });
  }

  takeSnap() {
    this.setState(prevState => {
      return { snapCount: prevState.snapCount + 1 };
    });
  }

  onSnap(data) {
    this.recognitionData.push(data);
  }

  generateLayout() {
    const { session } = this.props;
    const { turnOn, turnOff, snapCount } = this.state;
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
          <Webcam turnOn={turnOn} turnOff={turnOff} onSnap={this.onSnap} snap={snapCount} />
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
