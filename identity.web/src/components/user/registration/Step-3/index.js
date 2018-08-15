import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { HtmlWebcam } from '../../../common';
class RegistrationStep3 extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="p-8">
        <HtmlWebcam />
      </div>
    );
  }
}

RegistrationStep3.propTypes = { };

function mapStateToProps(state, ownProps) {
  return {
  
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationStep3);
