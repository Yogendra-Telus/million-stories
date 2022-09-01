import axios from 'axios';
import { message } from 'antd';
import { validateUserToken } from '../api/AccountApi';
import RESPONSE_CODE from '../config/ResponseCodes';
import AppConfig from './AppConfig';
import * as CookieService from '../utility/CookieService';
import * as Constants from '../config/Constants';

const API = axios.create({
  //   baseURL: 'http://localhost:8080/',
});

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem(Constants.TokenCaption);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
      validateUserToken(token).catch(error => {
        localStorage.clear();
        CookieService.removeItem(AppConfig.RememberMeCookie);
        CookieService.removeItem(AppConfig.RememberMeCookieLoggedOut);
        if (error.response && error.response.status === RESPONSE_CODE.FORBIDDEN) {
          setTimeout(() => {
            window.location = `/`;
          }, 1000);
          message.error('Access Denied, Account is either suspended or does not exist.');
          Promise.reject();
        } else {
          message.error(Constants.invalidTokenCaption);
        }
      });
    }
    return config;
  },
  error => Promise.reject(error)
);

API.interceptors.response.use(
  response => {
    if (response.data.token) {
      localStorage.setItem(Constants.TokenCaption, response.data.token);
    }
    if (response.data.userid) {
      localStorage.setItem(Constants.UserIdCaption, response.data.userid);
    }
    return response;
  },
  error => {
    if (error.response && error.response.status === RESPONSE_CODE.UNAUTHORIZED) {
      localStorage.removeItem(Constants.TokenCaption);
      localStorage.removeItem(Constants.UserIdCaption);
    }
    return Promise.reject(error);
  }
);
export default API;
