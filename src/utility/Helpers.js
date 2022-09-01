import _ from 'lodash';
import { MEDIA_TYPE } from '../config/Constants';

export const ExtractErrorMessage = error => {
  if (error.response) {
    if (error.response.status === 404) return error.response.data ? error.response.data.title : error.response.status;
    else if (error.response.status === 422)
      return error.response.data ? error.response.data.detail : error.response.title;
    return error.response.data ? error.response.data.detail : error.response.status;
  }
  return error.message;
};

export default ExtractErrorMessage;

export const URLGenerator = (mediaType, mediaId, mediaNameForSEO) => {
  if (mediaType === MEDIA_TYPE.EMBEDDED_MEDIA) {
    return `/mediacontent/${mediaNameForSEO}?${_.lowerCase(MEDIA_TYPE.VIDEO)}=${mediaId}`;
  }
  return `/media/${mediaNameForSEO}?${_.lowerCase(mediaType)}=${mediaId}`;
};
