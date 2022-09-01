import axios from 'axios';
import AppConfig from '../config/AppConfig';

const getFeaturedVideos = () => axios.get(`${AppConfig.ApiUrl}/userHomepage/featuredVideos`);

export default getFeaturedVideos;
