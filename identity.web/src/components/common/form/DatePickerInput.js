import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = ({
  name,
  onChange,
  placeholder,
  value,
  error,
  isDisabled,
  identifier,
  className,
  dateFormat
}) => {
  return (
    <div className="w-100">
      <DatePicker
        customInput={<Input invalid={!!error} />}
        dateFormat={dateFormat}
        selected={value}
        onChange={onChange}
        id={identifier}
        name={name}
        className={className}
        placeholderText={placeholder}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

DatePickerInput.defaultProps = {
  isDisabled: false,
  className: 'form-control',
  value: moment(),
  dateFormat: 'DD/MM/YYYY'
};

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  error: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  identifier: PropTypes.string.isRequired,
  className: PropTypes.string,
  dateFormat: PropTypes.string
};

export default DatePickerInput;
