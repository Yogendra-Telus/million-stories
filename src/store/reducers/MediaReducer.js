import {
  GET_CURRENT_PLAYING_MEDIA,
  GET_UPCOMING_VIDEOS,
  GET_MEDIA,
  GET_MEDIA_SHORT,
  GET_MEDIA_ID,
  POST_ADD_TO_PLAYLIST,
  POST_ADD_PLAYLIST,
  GET_SEARCH_MEDIA,
  POST_ADD_TO_FAVORITES,
  POST_REMOVE_FROM_FAVORITES,
  GET_FAVORITES,
  RESET_MEDIA_PLAYLIST_ACTION,
  CURRENT_TIME,
  GET_VIDEO_URL_ACTION,
  GET_IS_PAUSE,
} from '../actionTypes/MediaActionTypes';

import { GET_USER_PLAYLIST, GET_PLAYLIST_MEDIA, REMOVE_MEDIA_FROM_PLAYLIST } from '../actions/ActionTypes';

const MediaReducer = (
  state = {
    playlists: [],
    media: [],
    favorites: [],
    currentPlayingMedia: {},
    upcomingVideos: [],
    currentPlaylist: {},
    currentTime: '',
    isPause: false,
  },
  action
) => {
  let newPlaylists = [];
  const newFavorites = state.favorites && [...state.favorites];
  switch (action.type) {
    case GET_IS_PAUSE:
      return { ...state, isPause: action.isPause };
    case CURRENT_TIME:
      return { ...state, currentTime: action.curTime };
    case GET_CURRENT_PLAYING_MEDIA:
      return { ...state, currentPlayingMedia: action.mediaItem, currentTime: '' };
    case GET_UPCOMING_VIDEOS:
      return { ...state, upcomingMedias: { ...action.mediaItems, pageNumber: action.pageNumber } };
    case GET_MEDIA:
      return { ...state, media: [...action.media] };
    case GET_MEDIA_SHORT:
      return { ...state, media: [...action.media] };
    case GET_MEDIA_ID:
      return { ...state, media: action.mediaItem };
    case GET_VIDEO_URL_ACTION:
      return { ...state, videoUrl: action.videoUrl.url };
    case POST_ADD_TO_PLAYLIST: {
      if (state.playlists) {
        newPlaylists = [...state.playlists];
        const item = newPlaylists.find(elem => elem.playlistId === action.playlistId);
        if (item) {
          item.mediaIds.push({ id: action.playlistMediaItem.mediaId, mediaName: action.playlistMediaItem.mediaName });
        }
      }
      return {
        ...state,
        playlists: newPlaylists,
      };
    }
    case POST_ADD_PLAYLIST:
      // eslint-disable-next-line prefer-const
      // eslint-disable-next-line no-case-declarations
      if (state.playlists) {
        newPlaylists = [...state.playlists];
        newPlaylists.push({ playlistId: action.playlist.id, name: action.playlist.name, mediaIds: [] });
      } else {
        newPlaylists.push({ playlistId: action.playlist.id, name: action.playlist.name, mediaIds: [] });
      }
      return { ...state, playlists: newPlaylists };
    case GET_USER_PLAYLIST:
      return { ...state, type: GET_USER_PLAYLIST, playlists: action.playlists };
    case GET_SEARCH_MEDIA:
      return { ...state, media: action.media.items };
    case GET_PLAYLIST_MEDIA:
      return { ...state, type: GET_PLAYLIST_MEDIA, playlistMedia: action.playlistMedia };
    case RESET_MEDIA_PLAYLIST_ACTION:
      return { ...state, type: RESET_MEDIA_PLAYLIST_ACTION, playlistMedia: [] };
    case GET_FAVORITES:
      return { ...state, type: GET_FAVORITES, favorites: action.response };
    case POST_ADD_TO_FAVORITES:
      newFavorites.push(action.response);
      return { ...state, type: POST_ADD_TO_FAVORITES, favorites: newFavorites };
    case POST_REMOVE_FROM_FAVORITES:
      return {
        ...state,
        type: POST_REMOVE_FROM_FAVORITES,
        favorites: newFavorites.filter(elem => elem.favoriteId !== action.favorites.favoriteId),
      };
    case REMOVE_MEDIA_FROM_PLAYLIST:
      return { ...state, type: REMOVE_MEDIA_FROM_PLAYLIST };
    default:
      return state;
  }
};

export default MediaReducer;
