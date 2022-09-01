import axios from 'axios';
import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const getUserInfo = userId => API.get(`${AppConfig.ApiUrl}/users/${userId}`);

export const editUserInfo = editParams => API.post(`${AppConfig.ApiUrl}/users/editUser`, editParams);

export const getUserPlaylistsAPI = userId => API.get(`${AppConfig.ApiUrl}/users/playlists?userId=${userId}`);
export const getUserSubscriptions = userId => API.get(`${AppConfig.ApiUrl}/users/subscriptions?userId=${userId}`);
export const getWatchHistory = id =>
  API.get(`${AppConfig.ApiUrl}/userMedia/WatchHistory`, {
    params: {
      userId: id,
    },
  });
export const postWatchHistory = mediaId =>
  API.post(`${AppConfig.ApiUrl}/userMedia/WatchHistory`, null, {
    params: {
      mediaId,
    },
  });
export const removeWatchHistoryItem = mediaId =>
  API.delete(`${AppConfig.ApiUrl}/userMedia/removeWatchHistory?mediaId=${mediaId}`);

export const postSignIn = authData => API.post(`${AppConfig.AuthUrl}/auth/signIn`, authData);
export const postSignUp = authData => API.post(`${AppConfig.AuthUrl}/auth/userSignUp`, authData);
export const postForgotPassword = email => API.post(`${AppConfig.AuthUrl}/auth/forgotPassword`, email);
export const postResetPassword = authData =>
  API.post(`${AppConfig.AuthUrl}/auth/resetPassword`, {
    resetToken: `${authData.resetToken}`,
    newPassword: `${authData.newPassword}`,
  });
export const postSetPassword = authData =>
  API.post(`${AppConfig.AuthUrl}/auth/setPassword`, {
    setPasswordToken: `${authData.setPasswordToken}`,
    password: `${authData.newPassword}`,
  });

export const postSetUserEmail = (userId, emailId) =>
  API.post(`${AppConfig.AuthUrl}/auth/setEmail`, {
    userId,
    email: emailId,
  });
export const getFavorites = userId => API.get(`${AppConfig.ApiUrl}/users/favorites?userId=${userId}`);
export const changePassword = authData => API.post(`${AppConfig.AuthUrl}/auth/changePassword`, authData);
export const validateUserToken = token =>
  axios.post(`${AppConfig.AuthUrl}/auth/validateUserToken`, {
    token,
  });
