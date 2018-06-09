import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { WebcamService } from '../../../services';

class WebcamForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.setupWebcamOptions(props.options);
  }

  componentDidMount() {
    const { turnOn, turnOff, snap } = this.props;
    this.manageWebcam(turnOn, turnOff, snap);
    this.registerWebcamEvents();
  }

  componentWillUnmount() {
    const { load, live, error, uploadComplete, uploadProgress } = this.props.events;

    WebcamService.off( 'load', load);
    WebcamService.off( 'live', live);
    WebcamService.off( 'error', error);
    WebcamService.off( 'uploadComplete', uploadComplete);
    WebcamService.off( 'uploadProgress', uploadProgress);
  }

  registerWebcamEvents() {
    const { load, live, error, uploadComplete, uploadProgress } = this.props.events;

    WebcamService.on( 'load', load);
    WebcamService.on( 'live', live);
    WebcamService.on( 'error', error);
    WebcamService.on( 'uploadComplete', uploadComplete);
    WebcamService.on( 'uploadProgress', uploadProgress);
  }

  attach() {
    const { identifier } = this.props;
    WebcamService.attach(`#${identifier}`);
  }

  reset() {
    WebcamService.reset();
  }

  manageWebcam(turnOn, turnOff, snap) {
    if (snap < 1) {
      !!turnOn && this.attach();
      !!turnOff && this.reset();
    } else {
      this.takeSnap();
    }
  }

  setupWebcamOptions(option) {
    WebcamService.set(option);
  }

  takeSnap() {
    WebcamService.snap(this.props.onSnap);
  }

  render() {
    const { className, identifier, turnOn, turnOff, snap } = this.props;
    this.manageWebcam(turnOn, turnOff, snap);
    return <div id={identifier} className={className} />;
  }
}

WebcamForm.defaultProps = {
  options: {
    width: 320,
    height: 240,
    dest_width: 640,
    dest_height: 480,
    image_format: 'jpeg',
    jpeg_quality: 90,
    force_flash: false,
    flip_horiz: true,
    fps: 45
  },
  className: 'd-none',
  identifier: 'webcam',
  turnOn: false,
  turnOff: false,
  onSnap: () => {},
  snap: 0,
  events: {
    load: () => {},
    live: () => {},
    error: () => {},
    uploadProgress: () => {},
    uploadComplete: () => {}
  }
};

function mapStateToProps(state, ownProps) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  };
}

WebcamForm.propTypes = {
  options: PropTypes.object.isRequired,
  turnOn: PropTypes.bool.isRequired,
  turnOff: PropTypes.bool.isRequired,
  snap: PropTypes.number.isRequired,
  identifier: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onSnap: PropTypes.func.isRequired,
  events: PropTypes.shape({
    load: PropTypes.func.isRequired,
    live: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    uploadComplete: PropTypes.func.isRequired,
    uploadProgress: PropTypes.func.isRequired
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(WebcamForm);
