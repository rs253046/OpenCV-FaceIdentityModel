import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {dashboardAction, commonAction} from '../../../actions';
import {PropTypes} from 'prop-types';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants';

class FaceRecognitionMain extends Component {
  socket;
  constructor(props, context) {
    super(props, context);
    this.onCapture = this.onCapture.bind(this);
    this.onStopCapture = this.onStopCapture.bind(this);
    this.onStartStream = this.onStartStream.bind(this);
    this.socket = io.connect('http://localhost:3000');
  }

  componentDidMount(){
    this.streamDataONCanvas();
  }

  onStartStream() {
    this.socket.emit('startRecognitionStreaming');
  }

  onCapture() {
    this.socket.emit('startRecognitionCapturing');
  }

  onStopCapture() {
    this.socket.emit('stopRecognitionStreaming');
  }

  streamDataONCanvas() {
    const canvas = document.getElementById('canvas-video');
    const context = canvas.getContext('2d');
    const img = new Image();
    context.fillStyle = '#333';
    context.fillText('Loading...', canvas.width / 2 - 30, canvas.height / 3);
    this.socket.on('recognitionStream', function(data) {
      function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      const str = arrayBufferToBase64(data.buffer);
      const base64String = str;
      img.onload = function() {
        context.drawImage(this, 0, 0, canvas.width, canvas.height);
      };
      img.src = 'data:image/png;base64,' + base64String;
    });
  }

  componentWillUnmount() {
    this.onStopCapture();
  }

  generateLayout() {
    return (<div>
      <button className="btn" type="submit" onClick={this.onStartStream}>Start Webcam</button>
      <button className="btn" type="submit" onClick={this.onCapture}>Start Streaming</button>
      <button className="btn" type="submit" onClick={this.onStopCapture}>Stop Webcam</button>
      <Link to={APP_ROUTES.FACE_DETECTION} className="btn">Back to training</Link>
      <div className="row">
        <div className="col ml-3">
          <canvas id="canvas-video" width="640" height="560" className="border border-secondary rounded"></canvas>
        </div>
      </div>
    </div>);
  }

  render() {
    return this.generateLayout();
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceRecognitionMain);
