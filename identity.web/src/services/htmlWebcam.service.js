class HtmlWebcamService {
  streams = [];
  getMediaDevices() {
    return navigator.mediaDevices.enumerateDevices();
  }

  attach(options) {
    options.forEach((option)=> {
      const element = option.deviceIdentifier;
      if (element && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: option.deviceId }
          }
        }).then(stream => {
          element.srcObject = stream;
          this.streams.push(stream);
          element.play();
        });
      }
    })
  }

  turnOn() {
    // this.video && this.video.play();
  }

  turnOff() {
    this.streams && this.streams.length > 0 &&  this.streams.map((stream) => stream.getTracks().forEach(track =>  track.stop()));
  }
}

export default new HtmlWebcamService();
