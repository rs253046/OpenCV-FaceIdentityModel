import actionTypes from '../actionType';

function setApplicationErrorState(error) {
  return { type: actionTypes.SET_APPLICATION_ERROR_STATE, error };
}

function clearApplicationErrorState(resetError) {
  return { type: actionTypes.CLEAR_APPLICATION_ERROR_STATE, resetError };
}

function showLoader() {
  return { type: actionTypes.SHOW_LOADER, loadingIndicator: { isLoading: true }};
}

function hideLoader() {
  return { type: actionTypes.HIDE_LOADER, loadingIndicator: { isLoading: false }};
}

function connectToSocket(socket) {
  return { type: actionTypes.CONNECT_TO_SOCKET, socket };
}

function disconnectSocket() {
  return { type: actionTypes.DISCONNECT_SOCKET, socket: null };
}

export default {
  setApplicationErrorState,
  clearApplicationErrorState,
  showLoader,
  hideLoader,
  connectToSocket,
  disconnectSocket
};
