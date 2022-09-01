import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

export const getFeaturedSeries = () => API.get(`${AppConfig.ApiUrl}/userHomepage/featuredSeries`);

export const subscribeToSeriesAsync = async (userId, seriesId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/subscribeSeries`, {
    userId,
    seriesId,
  });

export const unsubscribeToSeriesAsync = async (userId, seriesId) =>
  API.post(`${AppConfig.ApiUrl}/userMedia/unsubscribeSeries`, {
    userId,
    seriesId,
  });

export const getSeriesDetails = (seriesId, pageNumber) =>
  API.get(`${AppConfig.ApiUrl}/userHomepage/seriesMediaDetails`, {
    params: {
      seriesId,
      pageNumber,
    },
  });

export const mediaSearch = (searchItem, page) =>
  API.get(`${AppConfig.ApiUrl}/userHomepage/UserFacingCloudSearch`, {
    filterString: searchItem,
    page: page || 1,
    pageSize: 100,
  });

export const getUpcomingMedias = (mediaId, page, itemType) =>
  API.get(
    `${AppConfig.ApiUrl}/userHomepage/upcomingMedias?mediaId=${mediaId}&pageNumber=${page}&pageSize=${AppConfig.DefaultItemCount}&itemType=${itemType}`
  );
