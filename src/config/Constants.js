export const MENU_TYPE = {
  SERIES: 'SERIES',
  TOPICS: 'TOPICS',
  TOOLS: 'TOOLS',
};

export const MEDIA_TYPE = {
  VIDEO: 'Video',
  EMBEDDED_MEDIA: 'Embedded Media',
  PODCAST_AUDIO: 'Podcast Audio',
};

export const ITEM_TYPE = {
  SERIES: 'Series',
  TOPIC: 'Topic',
  EPISODE: 'Episode',
};

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const usPhoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;

export const subscribeToCaption = 'Subscribe to ';
export const subscribedCaption = 'Subscribed to ';
export const UnsubscribeFromCaption = 'Unsubscribe from ';
export const unsubscribedCaption = 'Unsubscribed from ';
export const addedToPlaylistCaption = 'Media successfully added to your playlist';
export const removedFromPlaylistCaption = 'Video removed from your playlist';
export const addedToFavoritesCaption = 'Media successfully added to your favorites';
export const removedFromFavoritesCaption = 'Media successfully removed from your favorites';
export const alreadyAddedToPlaylistCaption = 'Media item already added to playlist';
export const alreadyPlaylistExistCaption = 'Playlist already exists';
export const removerFromHistory = 'Media removed from watch history';
export const mediaIsNotAvailable = 'Media is not avaible';
export const seeAllCaption = 'See All';
export const seeMoreCaption = 'See More';
export const loadMoreCaption = 'Load More';
export const errorCaption = 'Some Error Occurred !';
export const invalidCredentialsErrorCaption = 'Invalid Credentials, Please check your UserName/Password';
export const loginSuccessfulCaption = 'You are successfully logged in';
export const logoutSuccessfulCaption = 'You are successfully logged out';
export const passwordResetCaption = 'Password is Reset successfully, Please Login !';
export const passwordChangedCaption = 'Password changed successfully, Please Login !';
export const registrationCompletedSuccess = 'Registration Completed Successfully!';
export const mailSentCaption = 'Mail successfully sent!';
export const linkIsNotValid = 'Link is not valid';
export const urlNotFound = 'Url Not Found';
export const emailSent = 'Email sent!';
export const accountCreated = 'Account created!';
export const playlistCreated = 'Playlist created';
export const somethingWentWrongCaption = 'Something went wrong';
export const emailValidationError = 'Please provide a valid email address';
export const invalidPassword = 'Invalid Password';
export const passwordRequirementsCaption = 'Password must meet requirements below.';
export const accountUpdatedCaption = 'Account Details Updated.';
export const invalidTokenCaption = 'Invalid Token';
export const deactivatedUserCaption = 'Your Account is De-Activated, Contact the Administrator';
export const invitedUserCaption = 'You have already been invited, please check your email';

export const VALIDATION_ERRORS = {
  required: 'This is a required field',
  phone: 'Phone number is not valid',
  max: 'Too many characters',
};

export const VIDEO_MEDIA_TYPE_ID = 1;
export const PODCAST_AUDIO_MEDIA_TYPE_ID = 2;
export const EMBEDDED_MEDIA_TYPE_ID = 3;
export const BANNER_MEDIA_TYPE_ID = 4;

export const EVENT_TYPE = {
  VIDEO_WATCH: 1,
  VIDEO_SHARE: 2,
  TOOL_CLICKS: 3,
  VW_25: 4,
  VW_50: 5,
  VW_75: 6,
  VW_100: 7,
};

export const UserIdCaption = 'userid';
export const TokenCaption = 'token';

export const USER_STATUS = {
  ACTIVE: 'Active',
  INVITED: 'Invited',
  SUSPENDED: 'Suspended',
};

export const ITEM_TYPE_ENUM = {
  RANDOM: 0,
  SERIES: 1,
  TOPIC: 2,
};
