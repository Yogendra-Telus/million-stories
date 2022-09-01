const AppConfig = {};

// environment specific variables
AppConfig.ApiUrl = process.env.REACT_APP_API_URL;
AppConfig.AuthUrl = process.env.REACT_APP_AUTH_URL;
AppConfig.WebUrl = process.env.REACT_APP_WEB_URL;
AppConfig.TwitterCallbackUrl = process.env.REACT_APP_TWITTER_CALLBACK_URL;
AppConfig.BaseUrl = process.env.REACT_APP_LOCALHOST_URL;
AppConfig.GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
AppConfig.FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
AppConfig.JWPlayerScript = process.env.REACT_APP_JWPLAYER_SCRIPT;
AppConfig.FacebookShare = 'https://www.facebook.com/sharer/sharer.php?u=';
AppConfig.TwitterShare = 'https://twitter.com/intent/tweet?text=';
AppConfig.MailShare = 'mailto:?body=';
AppConfig.DefaultPage = 1;
AppConfig.DefaultItemCount = 12;
AppConfig.TWITTER_AUTH_ID = '';
AppConfig.RememberMeCookie = 'jwt';
AppConfig.RememberMeCookieLoggedOut = 'RememberMeCookieLoggedOut';
AppConfig.RememberMeExpiry = 30;
AppConfig.MixPanelAccountKey = 'fbe88852048a77fa5e740b6232138466';

// Encryption key
AppConfig.CryptoKey = 'abc';

export default AppConfig;
