import axios from 'axios';
import AppConfig from '../config/AppConfig';

const trackEventAsync = async (eventTypeId, mediaId) =>
  axios.post(`${AppConfig.ApiUrl}/experiment/trackEvent`, {
    eventTypeId,
    mediaId,
  });

export default trackEventAsync;
