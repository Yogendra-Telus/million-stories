import {
  GET_USERINFO_SUCCESS,
  EDIT_USERINFO_SUCCESS,
  GET_USER_PLAYLIST,
  POST_SIGNIN,
  POST_SIGNUP,
  POST_FORGOT_PASSWORD,
  POST_RESET_PASSWORD,
  CHANGE_PASSWORD,
  GET_USER_SUBSCRIPTIONS,
  GET_WATCH_HISTORY,
  REMOVE_WATCH_HISTORY,
  USER_VALIDATED,
  POST_WATCH_HISTORY,
  POST_SET_PASSWORD,
  POST_SET_USER_EMAIL,
  MYACCOUNT_UNSUBSCRIBE_SERIES_SUCCESS,
  MYACCOUNT_UNSUBSCRIBE_TOPIC_SUCCESS,
} from '../actions/ActionTypes';
import RESPONSE_CODE from '../../config/ResponseCodes';

const AccountReducer = (
  state = {
    loading: false,
    userInfo: {},
    isAuth: false,
    subscriptions: [],
    watchHistory: [],
  },
  action
) => {
  switch (action.type) {
    case GET_USERINFO_SUCCESS:
      return { ...state, loading: true, userInfo: action.payload, isAuth: true };
    case EDIT_USERINFO_SUCCESS:
      return { ...state, loading: true, userInfo: action.payload, isAuth: true };
    case GET_USER_PLAYLIST:
      return { ...state, playlists: action.payload, isAuth: true };
    case GET_USER_SUBSCRIPTIONS:
      return { ...state, subscriptions: action.payload, isAuth: true };
    case GET_WATCH_HISTORY:
      return { ...state, watchHistory: action.payload.items, isAuth: true };
    case REMOVE_WATCH_HISTORY:
      return { ...state, isAuth: true };
    case POST_SIGNIN:
      return { ...state, userInfo: action.payload, isAuth: true };
    case POST_SIGNUP:
      return { ...state, userInfo: action.payload, isAuth: true };
    case POST_FORGOT_PASSWORD:
      return { ...state, isAuth: true };
    case POST_RESET_PASSWORD:
      return { ...state, isAuth: true };
    case POST_SET_PASSWORD:
      return { ...state, type: POST_SET_PASSWORD, success: true };
    case POST_SET_USER_EMAIL:
      return { ...state, type: POST_SET_USER_EMAIL };
    case CHANGE_PASSWORD:
      return { ...state, type: CHANGE_PASSWORD, isAuth: true };
    case USER_VALIDATED:
      return { ...state, type: USER_VALIDATED, isAuth: action.payload.status === RESPONSE_CODE.OK };
    case POST_WATCH_HISTORY: {
      const watchHistory = [...state.watchHistory];
      watchHistory.push({ ...action.payload });
      return { ...state, watchHistory };
    }
    case MYACCOUNT_UNSUBSCRIBE_SERIES_SUCCESS: {
      return {
        ...state,
        type: MYACCOUNT_UNSUBSCRIBE_SERIES_SUCCESS,
      };
    }
    case MYACCOUNT_UNSUBSCRIBE_TOPIC_SUCCESS: {
      const subscribedTopics = [...state.subscriptions.items];
      const unSubscribedTopic = subscribedTopics.findIndex(topic => topic === action.payload.data.topicId);
      subscribedTopics.splice(unSubscribedTopic, 1);
      return {
        ...state,
        type: MYACCOUNT_UNSUBSCRIBE_TOPIC_SUCCESS,
        subscriptions: subscribedTopics,
      };
    }
    default:
      return state;
  }
};

export default AccountReducer;
