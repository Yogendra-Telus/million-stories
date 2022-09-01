import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

const getUserSubscriptions = userId =>
  API.get(`${AppConfig.ApiUrl}/users/subscriptions`, {
    params: {
      userId,
    },
  });

export default getUserSubscriptions;
