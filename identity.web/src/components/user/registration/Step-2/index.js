import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../constants';

class RegistrationStep2 extends Component {

  constructor(props, context) {
    super(props, context);
    this.socket = io.connect('http://172.16.120.87:3000');
    this.state = {
      progressBarWidth: 0
    }
  }

  componentDidMount() {
    this.streamDataONCanvas();
    this.socket.emit('startCapturing');
  }

  updateProgressBar(width) {
    this.setState({
      progressBarWidth: width
    })
  }

  streamDataONCanvas() {
    this.socket.on('trainingSet', (data) => {
      this.updateProgressBar((data.length * 100)/20);
    })
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
              <div className="progress-bar bg-success progress-bar-striped" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: progressBarWidth + '%'}}>
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
    return (
      <div>
        <Link className="btn btn-primary" to={ APP_ROUTES.LOGIN }>
          Back to Login
        </Link>
      </div>
    );
  }

  renderStep2() {
    const { progressBarWidth } = this.state;

    const registrationProgress =  progressBarWidth < 100 ?
      this.registrationProgressBar(): this.registrationSuccess();
    return registrationProgress;
  }

  render() {
    const { progressBarWidth } = this.state;
    return this.renderStep2();
  }
}


function mapStateToProps(state, ownProps) {
  return {
    registration: state.registration
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStep2);
