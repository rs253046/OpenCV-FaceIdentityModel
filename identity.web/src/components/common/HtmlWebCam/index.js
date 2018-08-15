import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { HtmlWebcamService } from '../../../services';

class HtmlWebcam extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      deviceIdentifiers: []
    };
  }

  componentDidMount() {
    const { turnOn, turnOff, snap, identifier } = this.props;
    HtmlWebcamService.getMediaDevices().then(mediaDevice => {
      const videoDevices = mediaDevice.filter(device => device.kind === 'videoinput');
      this.setState({ deviceIdentifiers: videoDevices.map(device => `${identifier}_${device.deviceId}`) });
      const options = videoDevices.map(device => ({
        deviceIdentifier: document.getElementById(`${identifier}_${device.deviceId}`), deviceId: device.deviceId
      }));
      this.attach(options);
      this.manageWebcam(turnOn, turnOff, snap);
    });
  }

  componentWillUnmount() { }

  attach(options) {
    HtmlWebcamService.attach(options);
  }

  manageWebcam(turnOn, turnOff, snap) {
    if (snap < 1) {
      !!turnOn && this.start();
      !!turnOff && this.stop();
    } else {
      this.props.onSnap(this.state.deviceIdentifiers.map(deviceIdentifier => this.takeSnap(deviceIdentifier)));
    }
  }

  takeSnap(deviceIdentifier) {
    const video = document.getElementById(deviceIdentifier);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg');
  }

  start() {
    HtmlWebcamService.turnOn();
  }

  stop() {
    HtmlWebcamService.turnOff();
  }

  render() {
    const { deviceIdentifiers } = this.state;
    const { turnOn, turnOff, snap, className } = this.props;
    const videoDeviceStreams = deviceIdentifiers.map(deviceIdentifier => (
      <div key={deviceIdentifier}>
        <video autoPlay id={deviceIdentifier} height="480" width="640" className={className} />
        <canvas />
      </div>
    ));
    this.manageWebcam(turnOn, turnOff, snap);
    return (
      <div>
        {videoDeviceStreams}
      </div>
    );
  }
}

HtmlWebcam.defaultProps = {
  className: 'd-none',
  identifier: 'webcam',
  turnOn: false,
  turnOff: false,
  onSnap: () => { },
  snap: 0
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  };
}

HtmlWebcam.propTypes = {
  turnOn: PropTypes.bool.isRequired,
  turnOff: PropTypes.bool.isRequired,
  snap: PropTypes.number.isRequired,
  identifier: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onSnap: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HtmlWebcam);
