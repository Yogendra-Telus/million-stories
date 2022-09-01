import axios from 'axios';
import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const getAllMediaAPI = () => axios.get(`${AppConfig.ApiUrl}/media`);

export const getMediaIdAPI = (id, isAllMediaAccess) =>
  axios.get(`${AppConfig.ApiUrl}/media/${id}?isAllMediaAccess=${isAllMediaAccess || false}`);

export const getMediaShortInfoAPI = () => axios.get(`${AppConfig.ApiUrl}/media/shortInfo`);

export const getMediaPlaylistAPI = playlistId =>
  API.get(`${AppConfig.ApiUrl}/userMedia/mediaPlaylist`, { params: { playlistId } });

export const postMediaSearchAPI = filters => API.post(`${AppConfig.ApiUrl}/media/MediaSearch`, filters);

export const postAddToPlaylistAPI = playlistMediaData =>
  API.post(`${AppConfig.ApiUrl}/userMedia/addToPlaylist`, playlistMediaData);

export const getPlaylistMediaAPI = playlistId =>
  API.get(`${AppConfig.ApiUrl}/media/mediaPlaylist?playlistId=${playlistId}`);

export const postRemoveFromPlaylistAPI = data => API.post(`${AppConfig.ApiUrl}/userMedia/removeFromPlaylist`, data);

export const postAddPlaylistAPI = playlist => API.post(`${AppConfig.ApiUrl}/userMedia/addPlayList`, playlist);

export const editPlaylistAPI = (playlistId, playlistMediaData) =>
  API.put(`${AppConfig.ApiUrl}/userMedia/playlists/${playlistId}`, playlistMediaData);

export const deletePlaylistAPI = playlistId => API.delete(`${AppConfig.ApiUrl}/userMedia/removePlaylist/${playlistId}`);
export const postAddToFavouriteAPI = data => API.post(`${AppConfig.ApiUrl}/userMedia/addToFavourite`, data);
export const postRemoveFromFavouriteAPI = data => API.post(`${AppConfig.ApiUrl}/userMedia/removeFromFavourite`, data);
export const getVideoUrlAPI = id => axios.get(`${AppConfig.ApiUrl}/video/pipeline/presignurl/${id}`);
export const mediaSearch = (searchItem, pageNumber) =>
  API.get(
    `${AppConfig.ApiUrl}/userHomepage/search?filterString=${searchItem}&pageNumber=${pageNumber}&pageSize=${AppConfig.DefaultItemCount}`
  );
export const validatePartnerMedia = (mediaId, partnerId) =>
  axios.get(`${AppConfig.ApiUrl}/partners/validatePartnerDistribution?mediaId=${mediaId}&partnerId=${partnerId}`);
