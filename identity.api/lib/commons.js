import { cv, drawBlueRect, guid } from './utils';
import fs from 'fs';
import path from 'path';
import loadFacenet from './dnn/loadFacenet';
import { extractResults } from './dnn/ssdUtils';

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

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

const saveFaceImages = (frame, detectFaces, faceBasePath) => {
  const frameResized = frame.resizeToMax(800);
  const faceRects = detectFaces(frameResized);
  if (faceRects.length) {
    faceRects.forEach((faceRect, index) => {
      const faceImageList = fs.readdirSync(faceBasePath);
      const resizedFaceRect = new cv.Rect(faceRect.x - 15, faceRect.y - 15, faceRect.width + 50, faceRect.height + 50);
      cv.imwrite(`${faceBasePath}/${guid()}.jpg`, frameResized.getRegion(resizedFaceRect));
      console.log('done')
    });
  }
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


const trainFaceIdentityModel = () => {
  return new Promise((resolve, reject) => {
    const lbph = new cv.LBPHFaceRecognizer(1, 8, 8, 8, 90);
    const imagesSourcePath = path.resolve('lib/training/images');
    const imagesSourceDirectory = fs.readdirSync(imagesSourcePath);
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    const imageFiles = [];
    const imagelabels = [];

    imagesSourceDirectory.forEach(imagesSourceSubDirectory => {
      const imageFilesList = fs.readdirSync(path.resolve(imagesSourcePath, imagesSourceSubDirectory));
      imageFilesList.forEach(imagePath => {
        imagelabels.push(parseInt(imagesSourceSubDirectory, 10));
        imageFiles.push(path.resolve(imagesSourcePath, imagesSourceSubDirectory, imagePath));
      });
    });

    const getFaceImage = (imgObj) => {
      const { img, filePath} = imgObj;
      const faceRects = classifier.detectMultiScale(img).objects;
      if (!faceRects.length) {
        throw new Error(`failed to detect ${filePath}`);
      }
      return img.getRegion(faceRects[0]);
    };

    const trainImages = imageFiles
      .map(filePath => ({ img: cv.imread(filePath), filePath }))
      .map(imgObj =>({ img: imgObj.img.bgrToGray(), filePath: imgObj.filePath }))
      .map(getFaceImage)
      .map(faceImg => faceImg.resize(80, 80));
    const modelFilePath = path.resolve('lib/training/models/identityModel.yaml');
    lbph.train(trainImages, imagelabels);
    lbph.save(modelFilePath);
    resolve();
  });
}

const makeRunVideoFaceRecognition = () => {
  const lbph = new cv.LBPHFaceRecognizer(1, 8, 8, 8, 90);
  const modelFilePath = path.resolve('lib/training/models/identityModel.yaml');

  if (fs.existsSync(modelFilePath)) {
    lbph.load(modelFilePath);
  } else {
    trainFaceIdentityModel();
    lbph.load(modelFilePath);
  }

  return (frame) => {
    const twoFacesImg = frame;
    const result = classifier.detectMultiScale(twoFacesImg.bgrToGray());
    const minDetections = 10;
    let prediction = [];
    result.objects.forEach((faceRect, i) => {
      if (result.numDetections[i] < minDetections) {
        return;
      }

      const faceImg = twoFacesImg.getRegion(faceRect).resize(80, 80).bgrToGray();
      prediction.push(lbph.predict(faceImg));
    });

    return { result: prediction };
  }
}

export {
  makeRunVideoFaceRecognition,
  detectFaces,
  makeRunVideoFaceDetection,
  saveFaceImages,
  makeRunDetectFacenetSSD,
  trainFaceIdentityModel
}
