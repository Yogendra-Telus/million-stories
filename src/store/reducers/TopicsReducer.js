import _ from 'lodash';
import {
  GET_FEATURED_TOPICS_SUCCESS,
  GET_FEATURED_TOPICS_FAILURE,
  GET_TOPIC_SUBSCRIPTIONS_SUCCESS,
  SUBSCRIBE_TOPIC_SUCCESS,
  UNSUBSCRIBE_TOPIC_SUCCESS,
  GET_TOPIC_BY_ID_FAILURE,
  GET_TOPIC_BY_ID_SUCCESS,
  GET_TOPICS_FULL_INFO_SUCCESS,
  GET_TOPICS_FULL_INFO_FAILURE,
  POST_TOPICS_ALL_SUCCESS,
  POST_TOPICS_ALL_FAILURE,
  GET_TOPIC_MEDIA_DETAILS_SUCCESS,
  GET_TOPIC_MEDIA_DETAILS_FAILURE,
  GET_TOPIC_PLAYLISTS_SUCCESS,
  CREATE_TOPICS_PLAYLIST_SUCCESS,
  ADD_MEDIA_TO_TOPICS_PLAYLIST_SUCCESS,
} from '../actionTypes/TopicsActionTypes';
import RESPONSE_CODE from '../../config/ResponseCodes';

const TopicsReducer = (state = {}, action) => {
  let subscribedTopics;
  switch (action.type) {
    case GET_FEATURED_TOPICS_SUCCESS:
      return {
        ...state,
        type: GET_FEATURED_TOPICS_SUCCESS,
        featuredTopics: action.response.data.items,
      };
    case GET_FEATURED_TOPICS_FAILURE:
      return state;
    case SUBSCRIBE_TOPIC_SUCCESS: {
      subscribedTopics = [...state.userSubscriptions];
      subscribedTopics.push(action.response.data.topicId);
      return {
        ...state,
        type: SUBSCRIBE_TOPIC_SUCCESS,
        userSubscriptions: subscribedTopics,
      };
    }
    case UNSUBSCRIBE_TOPIC_SUCCESS: {
      subscribedTopics = [...state.userSubscriptions];
      const unSubscribedTopic = subscribedTopics.findIndex(topic => topic === action.response.data.topicId);
      subscribedTopics.splice(unSubscribedTopic, 1);
      return {
        ...state,
        type: UNSUBSCRIBE_TOPIC_SUCCESS,
        userSubscriptions: subscribedTopics,
      };
    }
    case GET_TOPIC_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        type: GET_TOPIC_SUBSCRIPTIONS_SUCCESS,
        userSubscriptions: action.response.data.items.filter(item => item.type === 'Topic').map(item => item.id),
      };
    case GET_TOPIC_BY_ID_SUCCESS:
      return {
        ...state,
        type: GET_TOPIC_BY_ID_SUCCESS,
        currentTopic: action.response.data,
      };
    case GET_TOPIC_BY_ID_FAILURE:
      return {
        ...state,
        type: GET_TOPIC_BY_ID_FAILURE,
      };
    case GET_TOPICS_FULL_INFO_SUCCESS:
      return {
        ...state,
        type: GET_TOPICS_FULL_INFO_SUCCESS,
        topics: action.response.data.items,
      };
    case GET_TOPICS_FULL_INFO_FAILURE:
      return {
        ...state,
        type: GET_TOPICS_FULL_INFO_FAILURE,
      };
    case POST_TOPICS_ALL_SUCCESS:
      return {
        ...state,
        type: POST_TOPICS_ALL_SUCCESS,
        topics: action.response.data.items,
      };
    case POST_TOPICS_ALL_FAILURE:
      return {
        ...state,
        type: POST_TOPICS_ALL_FAILURE,
      };
    case GET_TOPIC_MEDIA_DETAILS_SUCCESS: {
      let storeVideos = [];
      if (state.currentTopic && state.currentTopic.pageNumber !== action.pageNumber) {
        storeVideos = state.currentTopic.videos.concat(action.response.data.videos);
      } else {
        storeVideos = action.response.data.videos;
      }
      storeVideos = _.unionBy(storeVideos, 'id');
      return {
        ...state,
        type: GET_TOPIC_MEDIA_DETAILS_SUCCESS,
        currentTopic: {
          ...action.response.data,
          videos: storeVideos,
          pageNumber: action.pageNumber,
        },
      };
    }
    case CREATE_TOPICS_PLAYLIST_SUCCESS: {
      const newPlaylist = {
        playlistId: action.response.data.id,
        name: action.response.data.name,
        mediaIds: [],
      };
      return {
        ...state,
        type: CREATE_TOPICS_PLAYLIST_SUCCESS,
        playlists: action.response.status === RESPONSE_CODE.OK ? [...state.playlists, newPlaylist] : state.playlists,
      };
    }
    case ADD_MEDIA_TO_TOPICS_PLAYLIST_SUCCESS: {
      const updatedPlaylists = [...state.playlists];
      updatedPlaylists
        .find(playlist => playlist.playlistId === action.response.data.playlistId)
        .mediaIds.push({ id: action.response.data.mediaId });
      return {
        ...state,
        type: ADD_MEDIA_TO_TOPICS_PLAYLIST_SUCCESS,
        playlists: action.response.status === RESPONSE_CODE.OK && updatedPlaylists,
      };
    }
    case GET_TOPIC_MEDIA_DETAILS_FAILURE:
      return {
        ...state,
        type: GET_TOPIC_MEDIA_DETAILS_FAILURE,
      };
    case GET_TOPIC_PLAYLISTS_SUCCESS:
      return {
        ...state,
        type: GET_TOPIC_PLAYLISTS_SUCCESS,
        playlists: action.response.status === RESPONSE_CODE.OK ? action.response.data.playlists : undefined,
      };
    default:
      return state;
  }
};

export default TopicsReducer;
