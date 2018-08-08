class HtmlWebcamService {

  getMediaDevices() {
    return navigator.mediaDevices.enumerateDevices();
  }

  attach(element, deviceId) {
    console.log(element);
    this.video = element;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        if (this.video) {
          this.video.srcObject = stream;
          this.video.play();
        }
      });
    }
  }

  turnOn() {
    this.video && this.video.play();
  }

  turnOff() {
    this.video &&  this.video.srcObject.getTracks().forEach(track =>  track.stop());
  }
}

export default new HtmlWebcamService();
