class WebcamService {
  attach(identifier) {
    window.Webcam.attach(identifier);
  }

  reset() {
    window.Webcam.reset();
  }

  snap(cb) {
    return window.Webcam.snap((data_uri) => {
      cb(data_uri);
    });
  }

  on(event, cb) {
    return window.Webcam.on(event, cb);
  }

  off(event, cb) {
    return window.Webcam.off(event, cb);
  }

  upload() {
    window.Webcam.upload();
  }

  set(options) {
    window.Webcam.set(options);
  }
}

export default new WebcamService();
