import axios from 'axios';
import AppConfig from '../config/AppConfig';
import API from '../config/ApiConfig';

const getAllPartners = () => axios.get(`${AppConfig.ApiUrl}/partners`);
const postContactUsMail = data => API.post(`${AppConfig.ApiUrl}/common/contactUsMail`, data);
const postBecomeAPartnerMail = data => API.post(`${AppConfig.ApiUrl}/common/becomeAPartnerMail`, data);

export default { getAllPartners, postContactUsMail, postBecomeAPartnerMail };
