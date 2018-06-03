import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';

const SelectBox = ({
  name,
  onChange,
  defaultOption,
  value,
  error,
  options,
  identifier,
  className,
  dataValueField,
  dataTextField,
  isDisabled
}) => {
  const optionList = options.map(option =>
    <option key={option[dataValueField]} value={option[dataValueField]}>{option[dataTextField]}</option>);

  if (defaultOption) {
    optionList.unshift(<option value="" key="defaultOption">{defaultOption}</option>);
  }

  const selectChange = (event) => {
    const option = options.find((item) => item[dataValueField], event.target.value);
    const params = { option, event };
    onChange(params);
  };

  return (
    <div className="w-100">
      <Input type="select" name={name} id={identifier} value={value} onChange={selectChange} className={className}
        invalid={!!error} disabled={isDisabled}>
        {optionList}
      </Input>
      <FormFeedback>{ error }</FormFeedback>
    </div>
  );
};

SelectBox.defaultProps = {
  className: 'form-control',
  dataValueField: 'id',
  dataTextField: 'name',
  isDisabled: false
};

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  dataValueField: PropTypes.string.isRequired,
  dataTextField: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  isDisabled: PropTypes.bool
};

export default SelectBox;
