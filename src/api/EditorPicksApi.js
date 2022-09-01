import axios from 'axios';
import AppConfig from '../config/AppConfig';

const getEditorPicks = () => axios.get(`${AppConfig.ApiUrl}/userHomepage/editorPicks`);

export default getEditorPicks;
