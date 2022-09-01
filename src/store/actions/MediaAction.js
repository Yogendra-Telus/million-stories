import {
  getAllMediaAPI,
  getMediaShortInfoAPI,
  getMediaIdAPI,
  getMediaPlaylistAPI,
  postAddPlaylistAPI,
  postAddToPlaylistAPI,
  postMediaSearchAPI,
  editPlaylistAPI,
  deletePlaylistAPI,
  postRemoveFromFavouriteAPI,
  postAddToFavouriteAPI,
  getVideoUrlAPI,
  validatePartnerMedia,
} from '../../api/MediaApi';
import {
  GET_MEDIA,
  GET_MEDIA_SHORT,
  GET_MEDIA_ID,
  POST_ADD_TO_PLAYLIST,
  POST_ADD_PLAYLIST,
  GET_SEARCH_MEDIA,
  POST_ADD_TO_FAVORITES,
  POST_REMOVE_FROM_FAVORITES,
  GET_FAVORITES,
  GET_CURRENT_PLAYING_MEDIA,
  GET_UPCOMING_VIDEOS,
  RESET_MEDIA_PLAYLIST_ACTION,
  CURRENT_TIME,
  GET_VIDEO_URL_ACTION,
  GET_IS_PAUSE,
} from '../actionTypes/MediaActionTypes';
import { GET_USER_PLAYLIST, GET_PLAYLIST_MEDIA, REMOVE_MEDIA_FROM_PLAYLIST } from '../actions/ActionTypes';
import * as account from '../../api/AccountApi';
import { getUpcomingMedias } from '../../api/SeriesApi';

const dispatchAction = (type, data) => ({
  type,
  response: data,
});

const getIsPauseAction = isPause => ({
  type: GET_IS_PAUSE,
  isPause,
});

const getMediaAction = media => ({
  type: GET_MEDIA,
  media,
});

const getMediaShortInfoAction = media => ({
  type: GET_MEDIA_SHORT,
  media,
});

const getMediaIdAction = mediaItem => ({
  type: GET_MEDIA_ID,
  mediaItem,
});

const getCurrentPlayingMediaAction = mediaItem => ({
  type: GET_CURRENT_PLAYING_MEDIA,
  mediaItem,
});

const getUpcomingVideosAction = (mediaItems, pageNumber) => ({
  type: GET_UPCOMING_VIDEOS,
  mediaItems,
  pageNumber,
});

export const UpdateCurrentMediaTime = curTime => ({
  type: CURRENT_TIME,
  curTime,
});

const getPlaylistsAction = playlists => ({
  type: GET_USER_PLAYLIST,
  playlists,
});

const getPlaylistMediaAction = playlistMedia => ({
  type: GET_PLAYLIST_MEDIA,
  playlistMedia,
});

const postAddPlaylistAction = playlist => ({
  type: POST_ADD_PLAYLIST,
  playlist,
});

const postAddToPlaylistAction = (playlistMediaItem, playlistId) => ({
  type: POST_ADD_TO_PLAYLIST,
  playlistMediaItem,
  playlistId,
});

const postMediaSearchAction = media => ({
  type: GET_SEARCH_MEDIA,
  media,
});

const resetMediaPlaylistAction = () => ({
  type: RESET_MEDIA_PLAYLIST_ACTION,
});

const postRemoveFromFavouriteAction = favorites => ({
  type: POST_REMOVE_FROM_FAVORITES,
  favorites,
});

const deletePlaylistAction = () => ({
  type: REMOVE_MEDIA_FROM_PLAYLIST,
});

const getVideoUrlAction = data => ({
  type: GET_VIDEO_URL_ACTION,
  videoUrl: data,
});

export const getIsPause = isPause => dispatch => dispatch(getIsPauseAction(isPause));

export const getMedia = () => dispatch =>
  getAllMediaAPI()
    .then(res => {
      dispatch(getMediaAction(res.data));
    })
    .catch(error => {
      throw error;
    });

export const getVideoUrl = id => dispatch =>
  getVideoUrlAPI(id)
    .then(res => dispatch(getVideoUrlAction(res.data)))
    .catch(error => {
      throw error;
    });

export const postMediaSearch = filters => dispatch =>
  postMediaSearchAPI(filters)
    .then(res => dispatch(postMediaSearchAction(res.data)))
    .catch(error => {
      throw error;
    });

export const getMediaShortInfo = () =>
  getMediaShortInfoAPI()
    .then(res => getMediaShortInfoAction(res.data))
    .catch(error => {
      throw error;
    });

export const getMediaID = mediaId =>
  getMediaIdAPI(mediaId)
    .then(res => {
      getMediaIdAction(res.data);
    })
    .catch(error => {
      throw error;
    });

export const postAddToPlaylist = data => dispatch =>
  postAddToPlaylistAPI(data)
    .then(res => dispatch(postAddToPlaylistAction(res.data, data.playlistId)))
    .catch(error => {
      throw error;
    });

export const postAddPlaylist = (playlist, mediaId) => dispatch =>
  postAddPlaylistAPI(playlist)
    .then(res => dispatch(postAddPlaylistAction(res.data)))
    .then(item => {
      postAddToPlaylistAPI({ playlistId: item.playlist.id, mediaId }).then(res =>
        dispatch(postAddToPlaylistAction(res.data, item.playlist.id))
      );
    })
    .catch(error => {
      throw error;
    });

export const getPlaylists = userId => dispatch =>
  account
    .getUserPlaylistsAPI(userId)
    .then(res => dispatch(getPlaylistsAction(res.data.playlists)))
    .catch(error => {
      throw error;
    });

export const postAddToFavourite = data => dispatch =>
  postAddToFavouriteAPI(data)
    .then(res => dispatch(dispatchAction(POST_ADD_TO_FAVORITES, res.data)))
    .catch(error => {
      throw error;
    });

export const postRemoveFromFavourite = data => dispatch =>
  postRemoveFromFavouriteAPI(data)
    .then(res => dispatch(postRemoveFromFavouriteAction(res.data)))
    .catch(error => {
      throw error;
    });

export const getFavorites = userId => dispatch =>
  account
    .getFavorites(userId)
    .then(res => dispatch(dispatchAction(GET_FAVORITES, res.data.items)))
    .catch(error => {
      throw error;
    });

export const getPlaylistMedia = playlistId => dispatch =>
  getMediaPlaylistAPI(playlistId)
    .then(res => {
      dispatch(getPlaylistMediaAction(res.data.items));
    })
    .catch(error => {
      throw error;
    });

export const resetPlaylistMedia = () => async dispatch => {
  dispatch(resetMediaPlaylistAction());
};

export const editPlaylist = (userId, playlistId, playlistMediaData) => dispatch => {
  editPlaylistAPI(playlistId, playlistMediaData)
    .then(() => dispatch(getPlaylists(userId)))
    .catch(error => {
      throw error;
    });
};

export const deletePlaylist = (playlistId, userId) => dispatch => {
  deletePlaylistAPI(playlistId)
    .then(() => {
      dispatch(deletePlaylistAction());
      dispatch(getPlaylists(userId));
    })
    .catch(error => {
      throw error;
    });
};

export const getCurrentPlayingMedia = (id, isAllMediaAccess) => dispatch =>
  getMediaIdAPI(id, isAllMediaAccess)
    .then(res => dispatch(getCurrentPlayingMediaAction(res.data)))
    .catch(error => {
      throw error;
    });

export const getUpcomingMediasById = (id, page, itemType) => dispatch =>
  getUpcomingMedias(id, page, itemType)
    .then(res => dispatch(getUpcomingVideosAction(res.data, page)))
    .catch(error => {
      throw error;
    });

export const validatePartnerMediaExpiration = (mediaId, partnerId) => async () =>
  validatePartnerMedia(mediaId, partnerId)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });

const actionCreator = {
  getCurrentPlayingMedia,
  deletePlaylist,
  editPlaylist,
  getPlaylistMedia,
  getFavorites,
  postRemoveFromFavourite,
  postAddToFavourite,
  getPlaylists,
  postAddPlaylist,
  getMediaID,
  postAddToPlaylist,
  getMedia,
  getVideoUrl,
  postMediaSearch,
  getMediaShortInfo,
};

export default actionCreator;
