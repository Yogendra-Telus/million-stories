import mixpanel from 'mixpanel-browser';
import AppConfig from '../../../config/AppConfig';

mixpanel.init(AppConfig.MixPanelAccountKey);

const MixPanel = {
  reset: () => {
    mixpanel.reset();
  },
  register: userInfo => {
    mixpanel.register(userInfo);
  },
  identify: id => {
    mixpanel.identify(id);
  },
  alias: id => {
    mixpanel.alias(id);
  },
  track: (name, props) => {
    mixpanel.track(name, props);
  },
  cookie: {
    clear: () => {
      mixpanel.cookie.clear();
    },
  },
  people: {
    set: props => {
      mixpanel.people.set(props);
    },
  },
};

export default MixPanel;
