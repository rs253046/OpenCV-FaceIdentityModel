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
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
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

    timer(1000, 1000).pipe(take(1)).subscribe(
      () => this.takeSnap(), 
      () => {}, 
      () => {
        this.recognizeIdentity();
        this.turnOff();
      }
    );
  }

  recognizeIdentity() {
    const payload = { 
      data: this.recognitionData[0],
      returnFaceId: true,
      returnFaceLandmarks: true,
      returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    };  
    HttpService.post('faceApi/detect', payload).subscribe(faceInfo => {
      if (faceInfo.length === 0) {
        this.props.actions.setSessionError({ loginFailed: 'No face detected.' });
        return false;
      }
      
      HttpService.post('faceApi/identify', {
        faceIds: faceInfo.map(i => i.faceId),
        personGroupId: 1
      }).subscribe((res) => {
        this.props.actions.login({
          username: JSON.stringify({ faceInfo: faceInfo[0], personId: res[0].candidates[0] && res[0].candidates[0].personId }),
          password: 'identity'
        });
      }, error => {
        this.props.actions.setSessionError({ loginFailed: error.data.data.error.message });
        this.props.actions.hideLoader();
      });
    }, error => {
      this.props.actions.setSessionError({ loginFailed: error.data.data.error.message });
      this.props.actions.hideLoader();
    });
  }

  login() {
    this.props.actions.clearSessionError();
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
