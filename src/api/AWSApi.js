import axios from 'axios';
import AppConfig from '../config/AppConfig';

const logErrorToAWSCloudWatch = async (exception, stackTrace) =>
  axios.post(`${AppConfig.ApiUrl}/aws/LogError`, {
    exception,
    stackTrace,
  });

export default logErrorToAWSCloudWatch;
