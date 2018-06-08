import actionTypes from '../actionType';
import { HttpService } from '../../services';
import { API_CONSTANTS } from '../../constants';

function streamingStart(streaming) {
  return { type: actionTypes.STREAMING_STARTED, streaming };
}

function streamingEnded(streaming) {
  return { type: actionTypes.STREAMING_ENDED, streaming };
}

function startStreaming() {
  return function (dispatch) {
    return HttpService.get(API_CONSTANTS.START_STREAMING).subscribe((res) => {
      dispatch(streamingStart({ streaming: true }));
    });
  };
}

function stopStreaming() {
  return function (dispatch) {
    return HttpService.get(API_CONSTANTS.STOP_STREAMING).subscribe((res) => {
      dispatch(streamingEnded({ streaming: false }));
    });
  };
}

export default {
  startStreaming,
  stopStreaming
};
