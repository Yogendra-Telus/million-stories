import logErrorToAWSCloudWatch from '../../api/AWSApi';

const AwsLogger = {
  LogError(message, stackTrace) {
    logErrorToAWSCloudWatch(message, stackTrace);
  },
};

export default AwsLogger;
