const person = {};

const detectFaces = (img, netDet) => {
  var blob = cv.blobFromImage(img, 1, {width: 128, height: 96}, [104, 177, 123, 0], false, false);
  netDet.setInput(blob);
  var out = netDet.forward();

  var faces = [];
  for (var i = 0, n = out.data32F.length; i < n; i += 7) {
    var confidence = out.data32F[i + 2];
    var left = out.data32F[i + 3] * img.cols;
    var top = out.data32F[i + 4] * img.rows;
    var right = out.data32F[i + 5] * img.cols;
    var bottom = out.data32F[i + 6] * img.rows;
    left = Math.min(Math.max(0, left), img.cols - 1);
    right = Math.min(Math.max(0, right), img.cols - 1);
    bottom = Math.min(Math.max(0, bottom), img.rows - 1);
    top = Math.min(Math.max(0, top), img.rows - 1);

    if (confidence > 0.5 && left < right && top < bottom) {
      faces.push({x: left, y: top, width: right - left, height: bottom - top})
    }
  }
  blob.delete();
  out.delete();
  return faces;
};

const face2vec = (face, netRecogn) => {
  var blob = cv.blobFromImage(face, 1.0 / 255, {width: 96, height: 96}, [0, 0, 0, 0], true, false)
  netRecogn.setInput(blob);
  var vec = netRecogn.forward();
  blob.delete();
  return vec;
};
//! [Get 128 floating points feature vector]

//! [Recognize]
const recognize = (face, netRecogn) => {
  var vec = face2vec(face, netRecogn);

  var bestMatchName = 'unknown';
  var bestMatchScore = 0.5;  // Actually, the minimum is -1 but we use it as a threshold.
  for (let name in persons) {
    var personVec = persons[name];
    var score = vec.dot(personVec);
    if (score > bestMatchScore) {
      bestMatchScore = score;
      bestMatchName = name;
    }
  }
  vec.delete();
  return bestMatchName;
};
