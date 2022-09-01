import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const getUserPlaylists = userId =>
  API.get(`${AppConfig.ApiUrl}/users/playlists`, {
    params: {
      userId,
    },
  });

export const createPlaylist = (userId, name) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/addPlayList`, {
    userId,
    name,
  });

export const addToPlaylist = (playlistId, mediaId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/addToPlaylist`, {
    playlistId,
    mediaId,
  });

export const removeFromPlaylist = (playlistId, mediaId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/removeFromPlaylist`, {
    playlistId,
    mediaId,
  });
