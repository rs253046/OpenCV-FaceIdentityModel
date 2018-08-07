import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { WebcamService } from '../../../services';

class HtmlWebcam extends Component {
  constructor(props, context) {
    super(props, context);
    this.setupWebcamOptions(props.options);
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
   
  }

  registerWebcamEvents() {
   
  }

  attach() {
    const { identifier } = this.props;
    WebcamService.attach(`#${identifier}`);
  }

  reset() {
  }

  setupWebcamOptions(option) {
  }

  takeSnap() {  }

  render() {
    return <div>asdfasdf</div>;
  }
}

HtmlWebcam.defaultProps = { };

function mapStateToProps(state, ownProps) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: { }
  };
}

HtmlWebcam.propTypes = { };

export default connect(mapStateToProps, mapDispatchToProps)(HtmlWebcam);
