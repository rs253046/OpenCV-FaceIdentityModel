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
      socket.on('startStreaming', (data) => {
        console.log(data)
        this.imagesPath = data.userId || 0;
        canCapture = true;
        this.videoStream.turnOn();
      })

      socket.on('stopStreaming', (data) => {
        clearInterval(videoStreamInterval);
        clearInterval(snapshotInterval);
        canCapture = false;
        this.videoStream.turnOff();
      })

      socket.on('startCapturing', (data) => {
        this.startLiveVideoStream();
      })
    });
  }

  startLiveVideoStream() {
    const faceBasePath = path.resolve(`./lib/training/images/${this.imagesPath}`);
    console.log(faceBasePath);
    const runDetection = faceRecognitionService.makeRunVideoFaceDetection();
    const socket = this.ioSocket;
    this.captureSnapshots(socket, runDetection, faceBasePath);
    this.saveSnapshots(socket, runDetection, faceBasePath);
  }

  captureSnapshots(socket, runDetection, faceBasePath) {
    const {
      detectFaces,
      createImageBase64Buffer,
    } = faceRecognitionService;

    videoStreamInterval = setInterval(() => {
      const frame = this.videoStream && this.videoStream.snapshot();
      if (frame && canCapture) {
        const buffer = createImageBase64Buffer(runDetection(frame, detectFaces));
        socket.emit('detectionStream', { buffer });
      }
    }, 0);
  }

  saveSnapshots(socket, runDetection, faceBasePath) {
    const {
      saveFaceImages,
      detectFaces,
      createImageBase64Buffer,
    } = faceRecognitionService;

    snapshotInterval = setInterval(() => {
      const frame = this.videoStream && this.videoStream.snapshot();
      if (fs.readdirSync(faceBasePath).length <= 20 && !!frame && canCapture) {
        saveFaceImages(frame, detectFaces);
        socket.emit('trainingSet', { length: fs.readdirSync(faceBasePath).length });
      }
    }, 200);
    socket.emit('trainingSet', { length: fs.readdirSync(faceBasePath).length });
  }
}
