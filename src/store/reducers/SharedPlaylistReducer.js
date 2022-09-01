import { GET_SHARED_PLAYLIST_SUCCESS, GET_SHARED_PLAYLIST_FAILURE } from '../actionTypes/SharedPlaylistTypes';

const SharedPlaylistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SHARED_PLAYLIST_SUCCESS:
      return {
        ...state,
        videos: action.response.items,
        totalCount: action.response.totalCount,
      };
    case GET_SHARED_PLAYLIST_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default SharedPlaylistReducer;
