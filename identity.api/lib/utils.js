import path from 'path';
import cv from 'opencv4nodejs';
import fs from 'fs';

const videoStream = (videoFile = 0) => {
  return {
    turnOn() {
      this.camera = new cv.VideoCapture(0);
    },

    snapshot() {
      let frame = this.camera.read();
      if (frame.empty) {
        this.camera.reset();
        frame = this.camera.read();
      }

      return frame;
    },

    turnOff() {
      this.camera.release();
      // this.camera = null;
    }
  }
}

const convertBase64ImageToBuffer = image => {
  const extension = image.split(';')[0].match(/jpeg|png|gif/)[0];
  const data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = new Buffer(data, 'base64');
  return {buffer, extension };
}


const calculateMaxPrediction = (store) => {
  let frequency = {};
  let max = 0;
  let result;
  for(let v in store) {
    frequency[store[v]]=(frequency[store[v]] || 0)+1;
    if(frequency[store[v]] > max) {
      max = frequency[store[v]];
      result = store[v];
    }
  }

  return result;
}

const drawRect = (image, rect, color, opts = {
  thickness: 2
}) => image.drawRectangle(rect, color, opts.thickness, cv.LINE_8);

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const drawBlueRect = (image, rect, opts = { thickness: 2 }) =>
  drawRect(image, rect, new cv.Vec(255, 0, 0), opts);

const drawGreenRect = (image, rect, opts = { thickness: 2 }) =>
  drawRect(image, rect, new cv.Vec(0, 255, 0), opts);

const drawRedRect = (image, rect, opts = { thickness: 2 }) =>
  drawRect(image, rect, new cv.Vec(0, 0, 255), opts);

const removeDirectory = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


export {
  cv,
  guid,
  drawRect,
  drawBlueRect,
  drawGreenRect,
  drawRedRect,
  videoStream,
  removeDirectory,
  calculateMaxPrediction,
  convertBase64ImageToBuffer
}
