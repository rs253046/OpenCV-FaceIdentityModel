import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';

const TextInput = ({
  name,
  onChange,
  placeholder,
  value,
  error,
  type,
  maxLength,
  isDisabled,
  identifier,
  className
}) => {

  return (
    <div className="w-100">
      <Input type={type} name={name} className={className} placeholder={placeholder} value={value} onChange={onChange} maxLength= {maxLength} disabled={isDisabled} id={identifier} invalid={!!error}/>
      <FormFeedback>{ error }</FormFeedback>
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text',
  maxLength: 50,
  isDisabled: false,
  className: 'form-control'
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  identifier: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default TextInput;
