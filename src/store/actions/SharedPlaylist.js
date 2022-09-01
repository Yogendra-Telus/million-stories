import { GET_SHARED_PLAYLIST_SUCCESS, GET_SHARED_PLAYLIST_FAILURE } from '../actionTypes/SharedPlaylistTypes';
import * as MediaApi from '../../api/MediaApi';

const dispatchAction = (type, data) => ({
  type,
  response: data,
});

const actionCreator = {
  getPlaylistMedia: playlistId => async dispatch => {
    try {
      return MediaApi.getPlaylistMediaAPI(playlistId).then(response =>
        dispatch(dispatchAction(GET_SHARED_PLAYLIST_SUCCESS, response.data))
      );
    } catch (error) {
      return dispatch(dispatchAction(GET_SHARED_PLAYLIST_FAILURE, error));
    }
  },
};

export default actionCreator;
