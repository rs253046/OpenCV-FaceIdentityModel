import faceRecognitionService from '../services/faceRecognitionService';
import config from '../../config/environment';
import cv from 'opencv4nodejs';
import fs from 'fs';
import path from 'path';

let videoStreamInterval;
let snapshotInterval;
let canCapture = false;
export default class PhotoboothController {
  constructor(ioSocket) {
    this.ioSocket = ioSocket;
    this.videoStream = faceRecognitionService.videoStream();
    this.ioSocket.on('connection', (socket) => {
      socket.on('startRecognitionStreaming', (data) => {
        canCapture = true;
        this.videoStream.turnOn();
      })

      socket.on('stopRecognitionStreaming', (data) => {
        clearInterval(videoStreamInterval);
        clearInterval(snapshotInterval);
        canCapture = false;
        this.videoStream.turnOff();
      })

      socket.on('startRecognitionCapturing', (data) => {
        this.startLiveVideoStream();
      })
    });
  }

  startLiveVideoStream() {
    const faceBasePath = path.resolve('./lib/training/images');
    try {
      const runDetection = faceRecognitionService.makeRunVideoFaceRecognition();
      const socket = this.ioSocket;
      this.captureSnapshots(socket, runDetection, faceBasePath);
    }
    catch(err) {
      this.videoStream.turnOff();
    }
  }

  captureSnapshots(socket, runDetection, faceBasePath) {
    const {
      detectFaces,
      createImageBase64Buffer,
      calculateMaxPrediction
    } = faceRecognitionService;

    let counter = 10;
    let results = [];
    while (counter > 0) {
      const frame = this.videoStream && this.videoStream.snapshot();
      if (frame && canCapture) {
        results = results.concat(runDetection(frame, detectFaces).result);
        console.log(results);
      }
      counter = counter - 1;

      if (counter === 0) {
        if (results.length > 0) {
          results = results.sort(function(a, b){
          	return a.confidence-b.confidence
          });
        }

        console.log(results);
        const prediction = results[0].label;
        socket.emit('recognizedPerson', {
          prediction
        });
        this.videoStream.turnOff();
      }
    }
  }
}
