import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const getUserFavorites = userId =>
  API.get(`${AppConfig.ApiUrl}/users/favorites`, {
    params: {
      userId,
    },
  });

export const addToFavorites = (userId, mediaId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/addToFavourite`, {
    userId,
    mediaId,
  });

export const removeFromFavorites = (userId, mediaId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/removeFromFavourite`, {
    userId,
    mediaId,
  });
