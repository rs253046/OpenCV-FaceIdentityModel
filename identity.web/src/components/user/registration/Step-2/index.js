import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../constants';
import { registrationAction } from '../../../../actions';
import { HtmlWebcam } from '../../../common';
import { HttpService } from '../../../../services';
import { timer, zip } from 'rxjs';
import { take, tap } from 'rxjs/operators';
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
      id: props.registration.step1.id,
      personId: props.registration.step1.personId,
      username: props.registration.step1.username,
      emailAddress: props.registration.step1.emailAddress,
      binaries: []
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
    timer(1000, 1000).pipe(take(2)).subscribe(
      () => this.takeSnap(), 
      () => {}, 
      () => {
        this.trainIdentityModel();
        this.turnOff();
      }
    );
  }

  trainIdentityModel() {
    const request = this.state.binaries.map((binarie, index) => {
      const payload = { data: this.state.binaries[0], personGroupId: 1, personId: this.state.personId };
      return HttpService.post('faceApi/addFace', payload).pipe(tap(val => this.updateProgressBar(this.state.progressBarWidth + 50)));
    });

    request.push(HttpService.post('registration/profilePic', { data: this.state.binaries[0], userId: this.state.id }));

    zip(...request).subscribe(response => 
      HttpService.post('faceApi/trainPersonGroup', { personGroupId: 1 })
        .subscribe(() => {}));
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
    const {username, binaries} = this.state;
    return (
      <div className="p-8 text-center">
        <div>
          <img src={binaries && binaries[0]} alt="..." className="rounded-circle" height="120" width="120"/>
          <h1><p>Hi {username}!</p><p> Your identity is succesfully registered.</p></h1>
        </div>
        <div>
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
    this.updateProgressBar(50);
    this.setState(prevState => {
      return { binaries: [...prevState.binaries, data] };
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
        <HtmlWebcam turnOn={turnOn} turnOff={turnOff} onSnap={this.onSnap} snap={snapCount} />
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
