import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const validateGoogleUser = async tokenId =>
  API.post(`${AppConfig.AuthUrl}/auth/googleLogin`, null, {
    params: {
      tokenId,
    },
  });

export const validateFacebookUser = async tokenId =>
  API.post(`${AppConfig.AuthUrl}/auth/facebookLogin`, null, {
    params: {
      facebookToken: tokenId,
    },
  });
