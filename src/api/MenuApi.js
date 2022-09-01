import axios from 'axios';
import AppConfig from '../config/AppConfig';

export const getAllSeries = axios.post(`${AppConfig.ApiUrl}/series/all`, {
  page: 1,
  pageSize: 100,
});

export const getAllTopics = axios.post(`${AppConfig.ApiUrl}/topics/all`, {
  page: 1,
  pageSize: 100,
});

export const getAllTools = axios.post(`${AppConfig.ApiUrl}/tools/menu`, {
  page: 1,
  pageSize: 100,
});
