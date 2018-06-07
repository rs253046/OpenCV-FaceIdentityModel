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
    const runDetection = faceRecognitionService.makeRunVideoFaceRecognition();
    const socket = this.ioSocket;
    this.captureSnapshots(socket, runDetection, faceBasePath);
  }

  captureSnapshots(socket, runDetection, faceBasePath) {
    const {
      detectFaces,
      createImageBase64Buffer,
    } = faceRecognitionService;

    // videoStreamInterval = setInterval(() => {
    //   const frame = this.videoStream && this.videoStream.snapshot();
    //   if (frame && canCapture) {
    //     const buffer = createImageBase64Buffer(frame);
    //     socket.emit('recognitionStream', { buffer });
    //   }
    // }, 0);

    videoStreamInterval = setInterval(() => {
      const frame = this.videoStream && this.videoStream.snapshot();
      if (frame && canCapture) {
        console.log(runDetection(frame, detectFaces).result);
        socket.emit('recognizedPersons', {
          persons: runDetection(frame, detectFaces).result
        });
      }
    }, 2000);

  }
}
