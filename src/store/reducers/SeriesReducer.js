import {
  GET_FEATURED_SERIES_SUCCESS,
  GET_FEATURED_SERIES_FAILURE,
  GET_SERIES_SUBSCRIPTIONS_SUCCESS,
  SUBSCRIBE_SERIES_SUCCESS,
  UNSUBSCRIBE_SERIES_SUCCESS,
  GET_SERIES_DETAILS_SUCCESS,
  GET_USER_PLAYLISTS_SUCCESS,
  ADD_TO_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  REMOVE_FROM_PLAYLIST_SUCCESS,
  GET_USER_FAVORITES_SUCCESS,
  ADD_TO_FAVOURITES_SUCCESS,
  REMOVE_FROM_FAVORITES_SUCCESS,
  RESET_USER_DATA,
} from '../actionTypes/SeriesActionTypes';
import RESPONSE_CODE from '../../config/ResponseCodes';
import * as Constants from '../../config/Constants';

const SeriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FEATURED_SERIES_SUCCESS:
      return {
        ...state,
        type: GET_FEATURED_SERIES_SUCCESS,
        featuredSeries: action.response.items,
      };
    case GET_FEATURED_SERIES_FAILURE:
      return {
        ...state,
        type: GET_FEATURED_SERIES_FAILURE,
      };
    case SUBSCRIBE_SERIES_SUCCESS: {
      const userSubscriptions = [...state.userSubscriptions];
      userSubscriptions.push(action.response.data.seriesId);
      return {
        ...state,
        type: SUBSCRIBE_SERIES_SUCCESS,
        userSubscriptions,
      };
    }
    case UNSUBSCRIBE_SERIES_SUCCESS: {
      const userSubscriptions = [...state.userSubscriptions];
      userSubscriptions.splice(
        userSubscriptions.findIndex(serie => serie === action.response.data.seriesId),
        1
      );
      return {
        ...state,
        type: UNSUBSCRIBE_SERIES_SUCCESS,
        userSubscriptions,
      };
    }
    case GET_SERIES_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        type: GET_SERIES_SUBSCRIPTIONS_SUCCESS,
        userSubscriptions: action.response.data.items.filter(item => item.type === 'Series').map(item => item.id),
      };
    case GET_SERIES_DETAILS_SUCCESS: {
      let storeVideos = [];
      if (state.seriesDetails && state.seriesDetails.pageNumber !== action.pageNumber) {
        storeVideos = state.seriesDetails.videos.concat(action.response.data.videos);
      } else {
        storeVideos = action.response.data.videos;
      }
      return {
        ...state,
        type: GET_SERIES_DETAILS_SUCCESS,
        seriesDetails: {
          ...action.response.data,
          videos: storeVideos,
          pageNumber: action.pageNumber,
        },
      };
    }
    case GET_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        type: GET_USER_PLAYLISTS_SUCCESS,
        userPlaylists: action.response.status === RESPONSE_CODE.OK ? action.response.data.playlists : undefined,
      };
    case CREATE_PLAYLIST_SUCCESS: {
      const newPlaylist = {
        playlistId: action.response.data.id,
        name: action.response.data.name,
        mediaIds: [],
      };
      return {
        ...state,
        type: CREATE_PLAYLIST_SUCCESS,
        userPlaylists:
          action.response.status === RESPONSE_CODE.OK
            ? [...state.userPlaylists, newPlaylist]
            : state.userPlaylists.items,
      };
    }
    case CREATE_PLAYLIST_FAILURE:
      return {
        ...state,
        type: CREATE_PLAYLIST_FAILURE,
      };
    case ADD_TO_PLAYLIST_SUCCESS: {
      const updatedPlaylists = [...state.userPlaylists];
      updatedPlaylists
        .find(playlist => playlist.playlistId === action.response.data.playlistId)
        .mediaIds.push({ id: action.response.data.mediaId, seoUrl: action.response.data.seoUrl });
      return {
        ...state,
        type: ADD_TO_PLAYLIST_SUCCESS,
        userPlaylists: action.response.status === RESPONSE_CODE.OK && updatedPlaylists,
      };
    }
    case REMOVE_FROM_PLAYLIST_SUCCESS: {
      const updatedPlaylists = [...state.userPlaylists];
      const removedMedia = updatedPlaylists
        .findIndex(playlist => playlist.playlistId === action.response.data.playlistId)
        .mediaIds.find(media => media.mediaIds === action.response.data.mediaId);
      updatedPlaylists.splice(removedMedia, 1);
      return {
        ...state,
        type: REMOVE_FROM_PLAYLIST_SUCCESS,
        userPlaylists: action.response.status === RESPONSE_CODE.OK && updatedPlaylists,
      };
    }
    case GET_USER_FAVORITES_SUCCESS:
      return {
        ...state,
        type: GET_USER_FAVORITES_SUCCESS,
        userFavorites: action.response.status === RESPONSE_CODE.OK ? action.response.data.items : undefined,
      };
    case ADD_TO_FAVOURITES_SUCCESS:
      return {
        ...state,
        type: ADD_TO_FAVOURITES_SUCCESS,
        userFavorites:
          action.response.status === RESPONSE_CODE.OK
            ? [
                ...state.userFavorites,
                {
                  favoriteId: action.response.data.favoriteId,
                  mediaId: action.response.data.mediaId,
                  seoUrl: action.response.data.seoUrl,
                },
              ]
            : state.userFavorites,
      };
    case REMOVE_FROM_FAVORITES_SUCCESS: {
      const updatedFavorites = [...state.userFavorites];
      updatedFavorites.splice(
        updatedFavorites.findIndex(elem => elem.favoriteId === action.response.data.favoriteId),
        1
      );
      return {
        ...state,
        type: REMOVE_FROM_FAVORITES_SUCCESS,
        userFavorites: action.response.status === RESPONSE_CODE.OK && updatedFavorites,
      };
    }
    case RESET_USER_DATA: {
      localStorage.removeItem(Constants.UserIdCaption);
      localStorage.removeItem(Constants.TokenCaption);
      return {
        ...state,
        type: RESET_USER_DATA,
        userFavorites: [],
        userPlaylists: [],
        userSubscriptions: [],
      };
    }
    default:
      return state;
  }
};

export default SeriesReducer;
