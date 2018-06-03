import path from 'path';
import cv from 'opencv4nodejs';

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


export {
  cv,
  guid,
  drawRect,
  drawBlueRect,
  drawGreenRect,
  drawRedRect,
  videoStream
}
