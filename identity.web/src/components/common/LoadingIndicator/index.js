import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ isLoading }) => (
  <div className="loading">Loading&#8230;</div>
);

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default LoadingIndicator;
