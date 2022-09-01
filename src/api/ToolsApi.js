import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const postToolsAllApi = filter => API.post(`${AppConfig.ApiUrl}/tools/all`, filter);
export const getToolByIdApi = id => API.get(`${AppConfig.ApiUrl}/tools/${id}`);

export default { postToolsAllApi, getToolByIdApi };
