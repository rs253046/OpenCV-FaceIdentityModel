import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes } from 'prop-types';

const FormatMessage = (props) => {
  const {
    id,
    values = {},
    defaultMessage = `missing translation ${id}`,
    callback = message => message
  } = props;

  return (
    <FormattedMessage id={id} defaultMessage={defaultMessage} values={values}>
      { callback }
    </FormattedMessage>
  );
};

export default FormatMessage;

FormatMessage.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.object,
  defaultMessage: PropTypes.string,
  callback: PropTypes.func
};
