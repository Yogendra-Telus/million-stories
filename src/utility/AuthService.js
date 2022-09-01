import * as Constants from '../config/Constants';

export const isAuthenticated = () => {
  const isLoggedIn = Boolean(localStorage.getItem(Constants.UserIdCaption));
  return isLoggedIn;
};

export const getUserId = () => Number(localStorage.getItem(Constants.UserIdCaption));
