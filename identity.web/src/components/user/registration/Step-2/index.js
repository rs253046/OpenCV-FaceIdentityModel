import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../constants';
import { registrationAction } from '../../../../actions';
import { Webcam } from '../../../common';
import { HttpService } from '../../../../services';

class RegistrationStep2 extends Component {
  constructor(props, context) {
    super(props, context);
    this.validateStep2();
    this.state = this.getInitialState(props);
    this.onSnap = this.onSnap.bind(this);
    this.props.actions.clearRegisteredUser();
  }

  getInitialState(props) {
    return {
      progressBarWidth: 0,
      turnOff: false,
      turnOn: false,
      snapCount: 0,
      id: props.registration.step1.id
    };
  }

  componentDidMount() {
    this.captureImageSet();
  }

  componentWillUnmount() {
    this.turnOff();
  }

  captureImageSet() {
    this.turnOn();
    const interval = setInterval(() => {
      if (this.state.progressBarWidth === 100) {
        this.trainIdentityModel();
        this.turnOff();
        clearInterval(interval);
      }
      this.takeSnap();
    }, 200);
  }

  trainIdentityModel() {
    HttpService.post('training/trainIdentityModel', {}).subscribe(() => {});
  }

  validateStep2() {
    const { history, registration } = this.props;
    if (registration.currentStep === 1) {
      history.push('/registration/step1');
    }
  }

  updateProgressBar(width) {
    this.setState({ progressBarWidth: width });
  }

  registrationProgressBar() {
    const { progressBarWidth } = this.state;
    return (
      <div className="p-12">
        <div className="row pb-2">
          <div className="col">
            Registering...
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="progress mb-1">
              <div className="progress-bar bg-success progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: progressBarWidth + '%' }}>
                {progressBarWidth}% Trained
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  registrationSuccess() {
    return (
      <div className="p-8">
        <div>
          <h1>Your identity is succesfully registered.</h1>
        </div>
        <div className="text-right w-50">
          <Link className="btn btn-primary" to={APP_ROUTES.LOGIN}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  turnOn() {
    this.setState({
      turnOn: true,
      turnOff: false
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
    const payload = { data, userId: this.state.id };
    const options = { skipLoader: true };
    HttpService.post('training/saveSnapshots', payload, options).subscribe((res) => {
      this.updateProgressBar((res.faceCount * 100)/20);
    });
  }

  renderStep2() {
    const { progressBarWidth } = this.state;
    const registrationProgress = progressBarWidth < 100 ?
      this.registrationProgressBar(): this.registrationSuccess();
    return registrationProgress;
  }

  render() {
    const { turnOn, turnOff, snapCount } = this.state;
    return (
      <div>
        {this.renderStep2()}
        <Webcam turnOn={turnOn} turnOff={turnOff} onSnap={this.onSnap} snap={snapCount} />
      </div>
    );
  }
}

RegistrationStep2.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  registration: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    registration: state.registration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registrationAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStep2);
