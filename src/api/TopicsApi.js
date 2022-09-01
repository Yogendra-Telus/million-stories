import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const getFeaturedTopics = () => API.get(`${AppConfig.ApiUrl}/userHomepage/featuredTopics`);

export const subscribeToTopicAsync = async (userId, topicId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/subscribeTopic`, {
    userId,
    topicId,
  });

export const unsubscribeToTopicAsync = async (userId, topicId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/unsubscribeTopic`, {
    userId,
    topicId,
  });

export const getTopicByIdApi = id => API.get(`${AppConfig.ApiUrl}/topics/${id}`);
export const postTopicsAllApi = data => API.post(`${AppConfig.ApiUrl}/topics/all`, data);
export const getTopicsFullInfoApi = parentId => API.get(`${AppConfig.ApiUrl}/topics/fullInfo?parentId=${parentId}`);
export const getTopicMediaDetailsApi = (topicId, pageNumber) =>
  API.get(`${AppConfig.ApiUrl}/userHomepage/topicMediaDetails?topicId=${topicId}&pageNumber=${pageNumber}`);
