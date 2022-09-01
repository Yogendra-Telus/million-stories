import * as AccountApi from '../../api/AccountApi';
import * as SocialApi from '../../api/SocialApi';
import * as SeriesApi from '../../api/SeriesApi';
import * as TopicsApi from '../../api/TopicsApi';
import {
  API_CALL_ERROR,
  GET_USERINFO_SUCCESS,
  EDIT_USERINFO_SUCCESS,
  GET_USER_PLAYLIST,
  GET_USER_SUBSCRIPTIONS,
  GET_WATCH_HISTORY,
  REMOVE_WATCH_HISTORY,
  POST_WATCH_HISTORY,
  POST_SIGNIN,
  POST_SIGNUP,
  POST_FORGOT_PASSWORD,
  POST_RESET_PASSWORD,
  CHANGE_PASSWORD,
  USER_VALIDATED,
  POST_SET_PASSWORD,
  POST_SET_USER_EMAIL,
  MYACCOUNT_UNSUBSCRIBE_SERIES_SUCCESS,
  MYACCOUNT_UNSUBSCRIBE_SERIES_FAILURE,
  MYACCOUNT_UNSUBSCRIBE_TOPIC_FAILURE,
  MYACCOUNT_UNSUBSCRIBE_TOPIC_SUCCESS,
} from '../actions/ActionTypes';
import dispatchAction from '../../utility/DispatchUtility';
import ExtractErrorMessage from '../../utility/Helpers';
import RESPONSE_CODE from '../../config/ResponseCodes';
import * as Constants from '../../config/Constants';

const actionCreator = {
  getUserInfo: userId => async dispatch =>
    AccountApi.getUserInfo(userId)
      .then(response => {
        dispatch(dispatchAction(GET_USERINFO_SUCCESS, response.data));
      })
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  editUserInfo: userInfo => async dispatch => {
    AccountApi.editUserInfo(userInfo).then(response => {
      dispatch(dispatchAction(EDIT_USERINFO_SUCCESS, response.data));
    });
  },

  getUserPlaylists: userId => dispatch => {
    AccountApi.getUserPlaylistsAPI(userId)
      .then(res => dispatch(dispatchAction(GET_USER_PLAYLIST, res.data)))
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      });
  },

  getSubscriptions: userId => async dispatch => {
    AccountApi.getUserSubscriptions(userId)
      .then(res => dispatch(dispatchAction(GET_USER_SUBSCRIPTIONS, res.data)))
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      });
  },

  removeSubscription: (userId, type, id) => async dispatch => {
    if (type === Constants.ITEM_TYPE.SERIES) {
      try {
        return SeriesApi.unsubscribeToSeriesAsync(userId, id).then(response =>
          dispatch(dispatchAction(MYACCOUNT_UNSUBSCRIBE_SERIES_SUCCESS, response))
        );
      } catch (error) {
        return dispatch(dispatchAction(MYACCOUNT_UNSUBSCRIBE_SERIES_FAILURE, error));
      }
    }
    try {
      return TopicsApi.unsubscribeToTopicAsync(userId, id).then(response =>
        dispatch(dispatchAction(MYACCOUNT_UNSUBSCRIBE_TOPIC_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(MYACCOUNT_UNSUBSCRIBE_TOPIC_FAILURE, error));
    }
  },

  getWatchHistory: userId => dispatch =>
    AccountApi.getWatchHistory(userId)
      .then(res => dispatch(dispatchAction(GET_WATCH_HISTORY, res.data)))
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  postWatchHistory: mediaId => dispatch =>
    AccountApi.postWatchHistory(mediaId)
      .then(res => dispatch(dispatchAction(POST_WATCH_HISTORY, res.data)))
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  removeWatchHistory: mediaId => async dispatch =>
    AccountApi.removeWatchHistoryItem(mediaId)
      .then(res => dispatch(dispatchAction(REMOVE_WATCH_HISTORY, res.data)))
      .catch(error => {
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  postSignIn: authData => dispatch =>
    AccountApi.postSignIn(authData)
      .then(res => dispatch(dispatchAction(POST_SIGNIN, res.data)))
      .catch(error => {
        localStorage.clear();
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw Error(ExtractErrorMessage(error));
      }),

  postSignUp: authData => dispatch =>
    AccountApi.postSignUp(authData)
      .then(res => dispatch(dispatchAction(POST_SIGNUP, res.data)))
      .catch(error => {
        localStorage.clear();
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  postForgotPassword: authData => dispatch =>
    AccountApi.postForgotPassword(authData)
      .then(res => dispatch(dispatchAction(POST_FORGOT_PASSWORD, res.data)))
      .catch(error => {
        localStorage.clear();
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw Error(ExtractErrorMessage(error));
      }),

  postSetPassword: authData => dispatch =>
    AccountApi.postSetPassword(authData)
      .then(res => dispatch(dispatchAction(POST_SET_PASSWORD, res.data)))
      .catch(error => {
        localStorage.clear();
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  postResetPassword: authData => dispatch =>
    AccountApi.postResetPassword(authData)
      .then(res => dispatch(dispatchAction(POST_RESET_PASSWORD, res.data)))
      .catch(error => {
        localStorage.clear();
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  postSetUserEmail: (userId, emailId) => dispatch =>
    AccountApi.postSetUserEmail(userId, emailId)
      .then(res => dispatch(dispatchAction(POST_SET_USER_EMAIL, res.data)))
      .catch(error => {
        localStorage.clear();
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  changePassword: authData => async dispatch =>
    AccountApi.changePassword(authData)
      .then(res => dispatch(dispatchAction(CHANGE_PASSWORD, res.data)))
      .catch(error => {
        localStorage.clear();
        dispatch(dispatchAction(API_CALL_ERROR, error));
        throw error;
      }),

  validateGoogleAuth: tokenId => dispatch =>
    SocialApi.validateGoogleUser(tokenId)
      .then(response => dispatch(dispatchAction(USER_VALIDATED, response)))
      .catch(error => {
        localStorage.clear();
        return dispatch(dispatchAction(API_CALL_ERROR, error));
      }),

  validateFacebookAuth: tokenId => dispatch =>
    SocialApi.validateFacebookUser(tokenId)
      .then(response => dispatch(dispatchAction(USER_VALIDATED, response)))
      .catch(error => {
        localStorage.clear();
        return dispatch(dispatchAction(API_CALL_ERROR, error));
      }),

  validateTwitterAuth: () => dispatch => dispatch(dispatchAction(USER_VALIDATED, { status: RESPONSE_CODE.OK })),
};

export default actionCreator;
