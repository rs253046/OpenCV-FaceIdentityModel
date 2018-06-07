import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import RegistrationForm from './RegistrationForm';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,CardHeader} from 'reactstrap';
import { registrationAction } from '../../../../actions';
import io from 'socket.io-client';

class RegistrationStep1 extends Component {

  constructor(props, context) {
    super(props, context);
    this.updateRegistrationState = this.updateRegistrationState.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.socket = io.connect('http://localhost:3000');
    this.state = {
      registration: { username: '', emailAddress: '' },
      errors: {}
    };
  }

  registerUser(event) {
    event.preventDefault();
    this.props.actions.registerUser(this.state.registration);
  }

  nextStep() {
    const { history } = this.props;
    history.push('/registration/step2');
  }

  updateRegistrationState(event) {
    const field = event.target.name;
    const { registration } = this.state;
    registration[field] = event.target.value;
    this.setState({registration});
  }

  transitionToNextStep(currentStep, step1) {
    this.nextStep();
  }

  render() {
    const { currentStep, step1 } = this.props.registration;

    if (currentStep === 2) {
      this.transitionToNextStep(currentStep, step1);
    }

    return (
      <div className="p-8">
        <Card>
         <CardHeader>Registration</CardHeader>
          <CardBody>
            <RegistrationForm onChange={this.updateRegistrationState} registration={this.state.registration} errors={this.state.errors}
            onSubmit={this.registerUser} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

RegistrationStep1.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStep1);
