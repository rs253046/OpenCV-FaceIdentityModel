import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { HtmlWebcamService } from '../../../services';

class HtmlWebcam extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    HtmlWebcamService.getMediaDevices().then(mediaDevice => {
      console.log(mediaDevice);
      const videoDevices = mediaDevice.filter(device => device.kind === 'videoinput');
      this.attach(videoDevices[0].deviceId);
      const { turnOn, turnOff, snap } = this.props;
      this.manageWebcam(turnOn, turnOff, snap);
    })
    
  }

  componentWillUnmount() { }

  attach(deviceId) {
    const { identifier } = this.props;
    HtmlWebcamService.attach(document.getElementById(identifier), deviceId);
  }

  manageWebcam(turnOn, turnOff, snap) {
    if (snap < 1) {
      !!turnOn && this.start();
      !!turnOff && this.stop();
    } else {
      this.takeSnap();
    }
  }

  takeSnap() { 
    const video = document.getElementById(this.props.identifier);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    console.log(canvas.toDataURL('image/jpeg'));
    this.props.onSnap(canvas.toDataURL('image/jpeg'));
    this.stop();
  }

  start() {
    HtmlWebcamService.turnOn();
  }

  stop() {
    HtmlWebcamService.turnOff();
  }

  render() {
    const { turnOn, turnOff, snap, identifier, className } = this.props;
    this.manageWebcam(turnOn, turnOff, snap);
    return (
      <div>
        <video autoPlay id={identifier} height="480" width="640" className={className}/>
        <canvas></canvas>
      </div>
    );
  }
}

HtmlWebcam.defaultProps = { 
  className: 'd-none',
  identifier: 'webcam',
  turnOn: false,
  turnOff: false,
  onSnap: () => {},
  snap: 0,
};

function mapStateToProps(state, ownProps) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: { }
  };
}

HtmlWebcam.propTypes = { 
  turnOn: PropTypes.bool.isRequired,
  turnOff: PropTypes.bool.isRequired,
  snap: PropTypes.number.isRequired,
  identifier: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onSnap: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HtmlWebcam);
