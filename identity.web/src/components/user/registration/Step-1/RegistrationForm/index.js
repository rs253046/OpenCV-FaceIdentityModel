import React from 'react';
import { Col, Form, FormGroup, Label, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { TextInput } from '../../../../common';

const RegistrationForm = ({ registration, errors, onChange, onSubmit }) => {
  return (
    <Form>
      <FormGroup row>
        <Label for="userName" sm={2} size="md">Name</Label>
        <Col sm={10}>
          <TextInput identifier="username" name="username" value={registration.username} onChange={onChange} error={errors.username} placeholder="Username"/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="userEmail" sm={2} size="md">Email</Label>
        <Col sm={10}>
          <TextInput type="email" identifier="emailAddress" name="emailAddress" value={registration.emailAddress} onChange={onChange} error={errors.emailAddress} placeholder="Email Address"/>
        </Col>
      </FormGroup>
      <Button type="submit" block onClick={onSubmit}>Next</Button>
    </Form>
  );
};

RegistrationForm.propTypes = {
  registration: PropTypes.shape({
    emailAddress: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }),
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default RegistrationForm;
