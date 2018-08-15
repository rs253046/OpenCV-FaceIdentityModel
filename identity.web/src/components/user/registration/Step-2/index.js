import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../constants';
import { registrationAction, commonAction } from '../../../../actions';
import { HtmlWebcam } from '../../../common';
import { HttpService } from '../../../../services';
import { timer, zip } from 'rxjs';
import { take, tap } from 'rxjs/operators';
class RegistrationStep2 extends Component {
  constructor(props, context) {
    super(props, context);
    this.validateStep2();
    this.state = this.getInitialState();
    this.onSnap = this.onSnap.bind(this);
  }

  getInitialState() {
    return {
      progressBarWidth: 0,
      turnOff: false,
      turnOn: false,
      snapCount: 0,
      binaries: []
    };
  }

  componentDidMount() {
    if (this.validateStep2()) {
      this.captureImageSet();
    }
  }

  componentWillUnmount() {
    this.turnOff();
  }

  validateStep2() {
    const { history, registration } = this.props;
    
    if (registration.currentStep === 1) {
      this.props.actions.hideLoader();
      history.push('/registration/step1');

      return false;
    }

    return true;
  }

  captureImageSet() {
    this.turnOn();
    this.props.actions.showLoader();
    timer(1000, 1000).pipe(take(2)).subscribe(
      () => this.takeSnap(),
      () => { },
      () => {
        this.registerUserIdentity();
        this.turnOff();
      }
    );
  }

  registerUserIdentity() {
    const user = { ...this.props.registration, data: this.state.binaries };
    this.props.actions.registerUser(user);
  }

  registrationSuccess() {
    const { binaries } = this.state;
    const { username } = this.props.registration.registration;
    return (
      <div className="p-8 text-center">
        <div>
          {binaries && binaries.map((binarie, index) => <img src={binarie} alt="..." className="rounded-circle" height="120" width="120" key={index} />)}
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
    this.setState(prevState => {
      return { binaries: data };
    });
  }

  renderStep2() {
    this.props.actions.hideLoader();
    return this.registrationSuccess();
  }

  render() {
    const { turnOn, turnOff, snapCount } = this.state;
    const { registration } = this.props;
    registration.currentStep === 1 && this.validateStep2();
    return (
      <div>
        {registration.currentStep === 3 && this.renderStep2()}
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
    registration: state.registration,
    actions: PropTypes.object.isRequired
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...registrationAction, ...commonAction }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStep2);
