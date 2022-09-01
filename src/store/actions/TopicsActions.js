import {
  GET_FEATURED_TOPICS_SUCCESS,
  GET_FEATURED_TOPICS_FAILURE,
  GET_TOPIC_SUBSCRIPTIONS_SUCCESS,
  GET_TOPIC_SUBSCRIPTIONS_FAILURE,
  SUBSCRIBE_TOPIC_SUCCESS,
  SUBSCRIBE_TOPIC_FAILURE,
  UNSUBSCRIBE_TOPIC_SUCCESS,
  UNSUBSCRIBE_TOPIC_FAILURE,
  POST_TOPICS_ALL_SUCCESS,
  POST_TOPICS_ALL_FAILURE,
  GET_TOPICS_FULL_INFO_SUCCESS,
  GET_TOPICS_FULL_INFO_FAILURE,
  GET_TOPIC_BY_ID_SUCCESS,
  GET_TOPIC_BY_ID_FAILURE,
  GET_TOPIC_MEDIA_DETAILS_FAILURE,
  GET_TOPIC_MEDIA_DETAILS_SUCCESS,
  GET_TOPIC_PLAYLISTS_SUCCESS,
  GET_TOPICS_PLAYLISTS_FAILURE,
  CREATE_TOPICS_PLAYLIST_SUCCESS,
  CREATE_TOPICS_PLAYLIST_FAILURE,
  ADD_MEDIA_TO_TOPICS_PLAYLIST_SUCCESS,
  ADD_MEDIA_TO_TOPICS_PLAYLIST_FAILURE,
} from '../actionTypes/TopicsActionTypes';
import getUserSubscriptions from '../../api/SubscriptionApi';
import * as TopicsApi from '../../api/TopicsApi';
import * as PlaylistApi from '../../api/PlaylistApi';

const dispatchAction = (type, data) => ({
  type,
  response: data,
});

const topicsDetailsDispatchAction = (type, data, pageNumber) => ({
  type,
  response: data,
  pageNumber,
});

const actionCreator = {
  getFeaturedTopics: () => async dispatch => {
    try {
      return TopicsApi.getFeaturedTopics().then(response =>
        dispatch(dispatchAction(GET_FEATURED_TOPICS_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_FEATURED_TOPICS_FAILURE, error));
    }
  },
  subscribeTopic: (userId, topicId) => async dispatch => {
    try {
      return TopicsApi.subscribeToTopicAsync(userId, topicId).then(response =>
        dispatch(dispatchAction(SUBSCRIBE_TOPIC_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(SUBSCRIBE_TOPIC_FAILURE, error));
    }
  },
  unsubscribeTopic: (userId, topicId) => async dispatch => {
    try {
      return TopicsApi.unsubscribeToTopicAsync(userId, topicId).then(response =>
        dispatch(dispatchAction(UNSUBSCRIBE_TOPIC_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(UNSUBSCRIBE_TOPIC_FAILURE, error));
    }
  },
  getUserSubscriptions: userId => async dispatch => {
    try {
      return getUserSubscriptions(userId).then(response =>
        dispatch(dispatchAction(GET_TOPIC_SUBSCRIPTIONS_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_TOPIC_SUBSCRIPTIONS_FAILURE, error));
    }
  },
  postTopicsAll: data => async dispatch => {
    try {
      return TopicsApi.postTopicsAllApi(data).then(response =>
        dispatch(dispatchAction(POST_TOPICS_ALL_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(POST_TOPICS_ALL_FAILURE, error));
    }
  },
  getTopicsFullInfo: parentId => async dispatch => {
    try {
      return TopicsApi.getTopicsFullInfoApi(parentId).then(response =>
        dispatch(dispatchAction(GET_TOPICS_FULL_INFO_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_TOPICS_FULL_INFO_FAILURE, error));
    }
  },
  getTopicById: id => async dispatch => {
    try {
      return TopicsApi.getTopicByIdApi(id).then(response =>
        dispatch(dispatchAction(GET_TOPIC_BY_ID_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_TOPIC_BY_ID_FAILURE, error));
    }
  },
  getTopicMediaDetails: (topicId, pageNumber) => async dispatch => {
    try {
      return TopicsApi.getTopicMediaDetailsApi(topicId, pageNumber).then(response =>
        dispatch(topicsDetailsDispatchAction(GET_TOPIC_MEDIA_DETAILS_SUCCESS, response, pageNumber))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_TOPIC_MEDIA_DETAILS_FAILURE, error));
    }
  },
  getTopicPlaylists: userId => async dispatch => {
    try {
      return PlaylistApi.getUserPlaylists(userId).then(response =>
        dispatch(dispatchAction(GET_TOPIC_PLAYLISTS_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_TOPICS_PLAYLISTS_FAILURE, error));
    }
  },
  addMediaToTopicsPlaylist: (playlistId, mediaId) => async dispatch => {
    try {
      return PlaylistApi.addToPlaylist(playlistId, mediaId).then(response =>
        dispatch(dispatchAction(ADD_MEDIA_TO_TOPICS_PLAYLIST_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(ADD_MEDIA_TO_TOPICS_PLAYLIST_FAILURE, error));
    }
  },
  createTopicsPlaylist: (userId, name) => async dispatch => {
    try {
      return PlaylistApi.createPlaylist(userId, name).then(response =>
        dispatch(dispatchAction(CREATE_TOPICS_PLAYLIST_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(CREATE_TOPICS_PLAYLIST_FAILURE, error));
    }
  },
};

export default actionCreator;
