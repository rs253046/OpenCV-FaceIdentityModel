import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';

const TextArea = ({
  name,
  onChange,
  placeholder,
  value,
  error,
  rows,
  cols,
  identifier,
  isDisabled
}) => {

  let calculatedRow = 0;

  if (value && value.length > 0) {
    const rowCount = value.length / 100;
    const lines = value.split(/\r|\r\n|\n/);
    calculatedRow = (rowCount > lines.length ? rowCount : lines.length);
    calculatedRow += 1;
  }

  rows = calculatedRow > rows ? calculatedRow : rows;

  return (
    <div>
      <Input id={identifier} type="textarea" name={name} className="form-control" placeholder={placeholder} value={value} onChange={onChange} rows={rows} cols={cols} disabled={isDisabled} invalid={!!error}/>
      <FormFeedback>{ error }</FormFeedback>
    </div>
  );
};

TextArea.defaultProps = {
  rows: 3,
  cols: 20,
  isDisabled: false
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  identifier: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};


export default TextArea;
