const fs = require('fs');
const path = require('path');
const cv = require('../opencv_js')();

module.exports = function () {
  const modelPath = path.resolve('lib/models');
  const modelFile = path.resolve(modelPath, 'face_recognition.t7');
  return new Promise((resolve, reject) => {
    fs.readFile(modelFile, function (err, data) {
      let res = new Uint8Array(data);
      cv.FS_createDataFile('/', 'face_recognition.t7', res, true, false, false);
      resolve(cv.readNetFromTorch('face_recognition.t7'));
    });
  })
};
