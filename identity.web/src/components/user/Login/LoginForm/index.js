import React from 'react';
import PropTypes from 'prop-types';
import { FormatMessage, TextInput } from '../../../common';
import { Button, Form, FormGroup, Label, FormText, InputGroup, InputGroupAddon } from 'reactstrap';
import { MdPerson, MdLock } from 'react-icons/lib/md';


const LoginForm = ({ user, errors, onChange, onSubmit }) => {
  return (
    <Form>
      <FormGroup className="mb-4">
        <Label for="username" hidden>Username</Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend" className="p-2 position-absolute loginFieldIcon"><MdPerson/></InputGroupAddon>
          <TextInput identifier="username" name="username" value={user.username} onChange={onChange} error={errors.username} placeholder="Username" className="pl-5"/>
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-4">
        <Label for="password" hidden>Password</Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend" className="p-2 position-absolute loginFieldIcon"><MdLock/></InputGroupAddon>
          <TextInput identifier="password" name="password" value={user.password} onChange={onChange} error={errors.password} type={'password'} placeholder="Password" className="pl-5"/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <FormText color="danger">{ errors.loginFailed }</FormText>
      </FormGroup>
      <Button type="submit" block onClick={onSubmit}>Login</Button>
    </Form>
  );
};

LoginForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
