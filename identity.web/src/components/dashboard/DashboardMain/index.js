import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dashboardAction, commonAction } from '../../../actions';
import { PropTypes } from 'prop-types';

class DashboardMain extends Component {

  getUserMood() {
    const { session } = this.props;
    if (session.currentUser && session.currentUser.faceInfo) {
      const emotions = session.currentUser.faceInfo.faceAttributes.emotion;
      return Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
    }
  }

  getEmotionsPics() {
    return {
      anger: 'anger.jpg',
      contempt: 'contempt.jpg',
      disgust: 'disgust.jpeg',
      fear: 'fear.jpg',
      happiness: 'happiness.jpeg',
      neutral: 'neutral.png',
      sadness: 'sadness.png',
      surprise: 'surprise.jpeg'
    };
  }

  generateLayout() {
    const { session } = this.props;
    const mood = this.getUserMood();
    const emotionPic = mood ? `assets/images/emotions/${this.getEmotionsPics()[mood]}`: '';
    const emotions = mood ? session.currentUser.faceInfo.faceAttributes: {};
    return (<div className="p-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome to Face Recognition Model, {session.currentUser && session.currentUser.username}!
            <img src={emotionPic} alt="" className="rounded-circle" height="40" width="40"/>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Let this system learn your face identity by training.
          </h6>
          <div className="card-text">
            <h6>Predictions</h6>
            <ul>
              <li>Age - {emotions.age}</li>
              <li>Gender - {emotions.gender}</li>
              <li>Glasses - {emotions.glasses}</li>
              <li>Smile - {emotions.smile}</li>
            </ul> 
            This project is under development process. This might be prone to several bug.
            Stable build will be available soon for the use.<br/>

            Simple step to training system about yourself.
            <ul>
              <li>Go to Start Training</li>
              <li>Click on Start Webcam to enable webcam on the system.</li>
              <li>Click on Start Streaming. That's It. System will automatically training itself by capturing data from your face. Training progress will be shown in progress bar.
            Note: For best prediction let system capture data at all angles.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>);
  }

  render() {
    return this.generateLayout();
  }
}

function mapStateToProps(state, ownProps) {
  return { dashboard: state.dashboard, session: state.session };
}

DashboardMain.propTypes = {
  dashboard: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...commonAction,
      ...dashboardAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMain);
