const fs = require('fs');
const path = require('path');
const cv = require('../opencv_js')();

module.exports = function () {
  const modelPath = path.resolve('lib/models');
  const prototxt = path.resolve(modelPath, 'face_detector.prototxt');
  const modelFile = path.resolve(modelPath, 'face_detector.caffemodel');
  return new Promise((resolve, reject) => {
    fs.readFile(prototxt, function (err, data) {
      let res = new Uint8Array(data);
      cv.FS_createDataFile('/', 'face_detector.prototxt', res, true, false, false);
      fs.readFile(modelFile, function(err, dasta) {
        let resss = new Uint8Array(dasta);
        cv.FS_createDataFile('/', 'face_detector.caffemodel', resss, true, false, false);
        resolve(cv.readNetFromCaffe('face_detector.prototxt', 'face_detector.caffemodel'));
      });
    });
  })
};
