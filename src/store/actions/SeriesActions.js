import {
  GET_FEATURED_SERIES_SUCCESS,
  GET_FEATURED_SERIES_FAILURE,
  GET_SERIES_SUBSCRIPTIONS_SUCCESS,
  GET_SERIES_SUBSCRIPTIONS_FAILURE,
  GET_SERIES_DETAILS_SUCCESS,
  GET_SERIES_DETAILS_FAILURE,
  SUBSCRIBE_SERIES_SUCCESS,
  SUBSCRIBE_SERIES_FAILURE,
  UNSUBSCRIBE_SERIES_SUCCESS,
  UNSUBSCRIBE_SERIES_FAILURE,
  GET_USER_PLAYLISTS_SUCCESS,
  GET_USER_PLAYLISTS_FAILURE,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  REMOVE_FROM_PLAYLIST_SUCCESS,
  REMOVE_FROM_PLAYLIST_FAILURE,
  GET_USER_FAVORITES_SUCCESS,
  GET_USER_FAVORITES_FAILURE,
  ADD_TO_FAVOURITES_SUCCESS,
  ADD_TO_FAVOURITES_FAILURE,
  REMOVE_FROM_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_FAILURE,
  RESET_USER_DATA,
} from '../actionTypes/SeriesActionTypes';
import * as SeriesApi from '../../api/SeriesApi';
import getUserSubscriptions from '../../api/SubscriptionApi';
import * as PlaylistApi from '../../api/PlaylistApi';
import * as FavoritesApi from '../../api/FavoritesApi';

const dispatchAction = (type, data) => ({
  type,
  response: data,
});

const seriesDetailsDispatchAction = (type, data, pageNumber) => ({
  type,
  response: data,
  pageNumber,
});

const actionCreator = {
  getFeaturedSeries: () => async dispatch => {
    try {
      return SeriesApi.getFeaturedSeries().then(response =>
        dispatch(dispatchAction(GET_FEATURED_SERIES_SUCCESS, response.data))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_FEATURED_SERIES_FAILURE, error));
    }
  },
  subscribeSeries: (userId, seriesId) => async dispatch => {
    try {
      return SeriesApi.subscribeToSeriesAsync(userId, seriesId).then(response =>
        dispatch(dispatchAction(SUBSCRIBE_SERIES_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(SUBSCRIBE_SERIES_FAILURE, error));
    }
  },
  unsubscribeSeries: (userId, seriesId) => async dispatch => {
    try {
      return SeriesApi.unsubscribeToSeriesAsync(userId, seriesId).then(response =>
        dispatch(dispatchAction(UNSUBSCRIBE_SERIES_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(UNSUBSCRIBE_SERIES_FAILURE, error));
    }
  },
  getUserSubscriptions: userId => async dispatch => {
    try {
      return getUserSubscriptions(userId).then(response =>
        dispatch(dispatchAction(GET_SERIES_SUBSCRIPTIONS_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_SERIES_SUBSCRIPTIONS_FAILURE, error));
    }
  },
  getSeriesDetails: (seriesId, pageNumber) => async dispatch => {
    try {
      return SeriesApi.getSeriesDetails(seriesId, pageNumber).then(response =>
        dispatch(seriesDetailsDispatchAction(GET_SERIES_DETAILS_SUCCESS, response, pageNumber))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_SERIES_DETAILS_FAILURE, error));
    }
  },
  getUserPlaylists: userId => async dispatch => {
    try {
      return PlaylistApi.getUserPlaylists(userId).then(response =>
        dispatch(dispatchAction(GET_USER_PLAYLISTS_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_USER_PLAYLISTS_FAILURE, error));
    }
  },
  createPlaylist: (userId, name) => async dispatch => {
    try {
      return PlaylistApi.createPlaylist(userId, name).then(response =>
        dispatch(dispatchAction(CREATE_PLAYLIST_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(CREATE_PLAYLIST_FAILURE, error));
    }
  },
  addMediaToPlaylist: (playlistId, mediaId) => async dispatch => {
    try {
      return PlaylistApi.addToPlaylist(playlistId, mediaId).then(response =>
        dispatch(dispatchAction(ADD_TO_PLAYLIST_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(ADD_TO_PLAYLIST_FAILURE, error));
    }
  },
  removeMediaFromPlaylist: (playlistId, mediaId) => async dispatch => {
    try {
      return PlaylistApi.removeFromPlaylist(playlistId, mediaId).then(response =>
        dispatch(dispatchAction(REMOVE_FROM_PLAYLIST_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(REMOVE_FROM_PLAYLIST_FAILURE, error));
    }
  },
  getUserFavorites: userId => async dispatch => {
    try {
      return FavoritesApi.getUserFavorites(userId).then(response =>
        dispatch(dispatchAction(GET_USER_FAVORITES_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_USER_FAVORITES_FAILURE, error));
    }
  },
  addMediaToFavorites: (userId, mediaId) => async dispatch => {
    try {
      return FavoritesApi.addToFavorites(userId, mediaId).then(response =>
        dispatch(dispatchAction(ADD_TO_FAVOURITES_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(ADD_TO_FAVOURITES_FAILURE, error));
    }
  },
  removeFromFavorites: (userId, mediaId) => async dispatch => {
    try {
      return FavoritesApi.removeFromFavorites(userId, mediaId).then(response =>
        dispatch(dispatchAction(REMOVE_FROM_FAVORITES_SUCCESS, response))
      );
    } catch (error) {
      return dispatch(dispatchAction(REMOVE_FROM_FAVORITES_FAILURE, error));
    }
  },
  resetUserData: () => async dispatch => {
    dispatch(dispatchAction(RESET_USER_DATA));
  },
};

export default actionCreator;
