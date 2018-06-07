import { cv, drawBlueRect, guid } from './utils';
import fs from 'fs';
import path from 'path';
import loadFacenet from './dnn/loadFacenet';
import { extractResults } from './dnn/ssdUtils';

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const faceBasePath = path.resolve('./lib/training/images');

const classifyImg = (net, img) => {
  const imgResized = img.resizeToMax(300);
  const inputBlob = cv.blobFromImage(imgResized);

  net.setInput(inputBlob);
  let outputBlob = net.forward();
  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[2], outputBlob.sizes[3]);

  return extractResults(outputBlob, img);
}

const makeRunDetectFacenetSSD = () => {
  const net = loadFacenet();
  return function(img, minConfidence) {
    const predictions = classifyImg(net, img);

    predictions
      .filter(res => res.confidence > minConfidence)
      .forEach(p => drawBlueRect(img, p.rect));

    return img;
  }
}

let delay = 0;

const saveFaceImages = (frame, detectFaces) => {
  const frameResized = frame.resizeToMax(800);
  const faceRects = detectFaces(frameResized);

  if (faceRects.length) {
    delay = delay + delay;
  }

  setTimeout(() => {
    if (faceRects.length) {
      faceRects.forEach((faceRect, index) => {
        const faceImageList = fs.readdirSync(faceBasePath);
        const resizedFaceRect = new cv.Rect(faceRect.x - 15, faceRect.y - 15, faceRect.width + 50, faceRect.height + 50);
        cv.imwrite(`${faceBasePath}/steve_${faceImageList.length + 2}.jpg`, frameResized.getRegion(resizedFaceRect));
        console.log('done')
      });
    }
  }, delay);
}

const makeRunVideoFaceDetection = () =>  {
  return function(frame, detectFaces) {
    const frameResized = frame.resizeToMax(800);
    const faceRects = detectFaces(frameResized);

    if (faceRects.length) {
      faceRects.forEach(faceRect => {
        return drawBlueRect(frameResized, faceRect);
      });
    }
    return frameResized;
  }
}

const detectFaces = (img) => {
  const options = {
    minSize: new cv.Size(100, 100),
    scaleFactor: 1.2,
    minNeighbors: 10
  };
  return classifier.detectMultiScaleGpu(img.bgrToGray(), options).objects;
}

const makeRunVideoFaceRecognition = () => {
  const nameMappings = ['rahul, steve'];
  const lbph = new cv.LBPHFaceRecognizer(1, 8, 8, 8, 100);
  const basePath = './lib/training';
  const imgsPath = path.resolve(basePath, 'images');
  const imgFiles = fs.readdirSync(imgsPath);
  const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

  const getFaceImage = (imgObj) => {
    const { img, filePath} = imgObj;
    const faceRects = classifier.detectMultiScale(img).objects;
    if (!faceRects.length) {
      throw new Error(`failed to detect ${filePath}`);
    }
    return img.getRegion(faceRects[0]);
  };

  const trainImgs = imgFiles
    .map(file => path.resolve(imgsPath, file))
    .map(filePath => ({ img: cv.imread(filePath), filePath }))
    .map(imgObj =>({ img: imgObj.img.bgrToGray(), filePath: imgObj.filePath }))
    .map(getFaceImage)
    .map(faceImg => faceImg.resize(80, 80));

  const labels = imgFiles
    .map(file => nameMappings.findIndex(name => file.includes(name)));
  console.log(labels);
  lbph.train(trainImgs, labels);

  return (frame) => {
    const twoFacesImg = frame;
    const result = classifier.detectMultiScale(twoFacesImg.bgrToGray());
    const minDetections = 10;
    let prediction = [];
    result.objects.forEach((faceRect, i) => {
      if (result.numDetections[i] < minDetections) {
        return;
      }

      const faceImg = twoFacesImg.getRegion(faceRect).bgrToGray();
      const who = nameMappings[lbph.predict(faceImg).label] || 'Unknown';
      const rect = cv.drawDetection(
        twoFacesImg,
        faceRect,
        { color: new cv.Vec(255, 0, 0), segmentFraction: 4 }
      );

      const alpha = 0.4;
      cv.drawTextBox(
        twoFacesImg,
        new cv.Point(rect.x, rect.y + rect.height + 10),
        [{ text: who + lbph.predict(faceImg).confidence }],
        alpha
      );
      prediction.push(who);
    });
    prediction = prediction.filter(pre => pre !== 'Unknown');
    return { twoFacesImg, result: prediction};
  }
}

export {
  makeRunVideoFaceRecognition,
  detectFaces,
  makeRunVideoFaceDetection,
  saveFaceImages,
  makeRunDetectFacenetSSD,
  faceBasePath
}
