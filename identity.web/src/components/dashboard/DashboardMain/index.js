import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dashboardAction, commonAction } from '../../../actions';
import { PropTypes } from 'prop-types';
import { FormatMessage } from '../../common';
import HttpService from '../../../services/http.service';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants';

class DashboardMain extends Component {
  socket;
  constructor(props, context) {
    super(props, context);
  }


  generateLayout() {
    const { session } = this.props;
    return (<div className="p-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome to Face Recognition Model, {session.currentUser && session.currentUser.username}!</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Let this system learn your face identity by training.
          </h6>
          <div className="card-text">
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
