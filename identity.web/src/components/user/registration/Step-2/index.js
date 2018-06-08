import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../constants';
import { registrationAction } from '../../../../actions';

class RegistrationStep2 extends Component {

  constructor(props, context) {
    super(props, context);
    this.validateStep2();
    this.socket = io.connect('http://localhost:3000');
    this.onStartStream = this.onStartStream.bind(this);
    this.onStartStream();
    this.state = {
      progressBarWidth: 0
    };
  }

  componentDidMount() {
    this.streamDataONCanvas();
    this.socket.emit('startCapturing');
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onStartStream() {
    const userId = this.props.registration.step1.id;
    this.socket.emit('startStreaming', { userId });
    this.props.actions.clearRegisteredUser();
  }

  validateStep2() {
    const { history, registration } = this.props;
    if (registration.currentStep === 1) {
      history.push('/registration/step1');
    }
  }

  updateProgressBar(width) {
    this.setState({
      progressBarWidth: width
    });
  }

  streamDataONCanvas() {
    this.socket.on('trainingSet', (data) => {
      this.updateProgressBar((data.length * 100)/20);
    });
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
    this.socket.emit('stopStreaming');
    this.socket.emit('starTrainingIdentityModel');
    return (
      <div className="p-8">
        <div>
          <h1>Your identity is succesfully registered.</h1>
        </div>
        <div class="text-right w-50">
          <Link className="btn btn-primary" to={APP_ROUTES.LOGIN}>
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  renderStep2() {
    const { progressBarWidth } = this.state;

    const registrationProgress = progressBarWidth < 100 ?
      this.registrationProgressBar(): this.registrationSuccess();
    return registrationProgress;
  }

  render() {
    const { progressBarWidth } = this.state;
    return this.renderStep2();
  }
}


RegistrationStep2.propTypes = {
  actions: PropTypes.object.isRequired
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
