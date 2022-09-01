import React from 'react';
import queryString from 'query-string';
import ScrollSnap from 'scroll-snap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VisibilitySensor from 'react-visibility-sensor';
import { isMobile, isEdge, withOrientationChange } from 'react-device-detect';
import Series from './Series';
import Topics from './Topics';
import Videos from './Videos';
import Footer from '../common/Footer';
import actionCreator from '../../store/actions/MenuActions';
import ResetPasswordModal from '../modal/ResetPasswordModal';
import SetPasswordModal from '../modal/SetPasswordModal';
import MixPanel from '../common/MixPanel/MixPanel';
import MixPanelEvents from '../common/MixPanel/MixPanelEvents';

const snapConfig = {
  scrollSnapDestination: '0% 100%',
  scrollTimeout: 100,
  scrollTime: 300,
};

const sectionName = {
  VIDEOS: 'Videos',
  SERIES: 'Series',
  TOPICS: 'Topics',
  FOOTER: 'Footer',
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.seriesRef = React.createRef();
    this.scrollRef = React.createRef();
    this.state = {
      surroundingContainerElement: null,
      resetPassword: false,
    };
    MixPanel.track(MixPanelEvents.LOGGED_OUT_ENTRY, {
      url: window.location.href,
    });
  }

  componentDidMount() {
    const { current } = this.scrollRef;
    const { location } = this.props;
    const queryParams = queryString.parse(location.search);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      surroundingContainerElement: current,
      resetPassword: !!queryParams.resetToken,
    });
    if (isEdge) {
      this.bindScrollSnap();
    }
  }

  onScroll = () => {
    const { current } = this.scrollRef;
    const { scrollTop } = current;
    if (!isMobile) {
      if (scrollTop < window.innerHeight) {
        this.props.setTitle('');
        this.props.setTheme('');
      }
      if (scrollTop > window.innerHeight - 50 && scrollTop < window.innerHeight * 2) {
        this.props.setTitle('Series');
        this.props.setTheme('');
        this.props.setDisplay(' transparent-bg');
      }
      if (scrollTop > window.innerHeight * 2 - 100 && scrollTop < window.innerHeight * 3) {
        this.props.setTitle('Featured Topics');
        this.props.setTheme('Dark');
        this.props.setDisplay(' transparent-bg');
      }
    }
  };

  onVisibilityChange = (isVisible, key) => {
    if (isMobile) {
      if (key === sectionName.VIDEOS && isVisible) {
        this.props.setTitle('');
      } else if (key === sectionName.SERIES && isVisible) {
        this.props.setTitle(sectionName.SERIES);
        this.props.setTheme('');
        this.props.setDisplay(' transparent-bg');
      } else if (key === sectionName.TOPICS && isVisible) {
        this.props.setTitle('Featured Topics');
        this.props.setTheme('Dark');
        this.props.setDisplay(' transparent-bg');
      } else if (key === sectionName.FOOTER && isVisible) {
        this.props.setTitle('');
        this.props.setDisplay(' transparent-bg');
        this.props.setTheme('');
      }
    }
  };

  getClassName = key => {
    let className;
    switch (key) {
      case sectionName.TOPICS:
        className = 'component-topic';
        break;
      case sectionName.FOOTER:
        className = 'component-footer';
        break;
      default:
        className = '';
        break;
    }
    return className;
  };

  handleScroll = e => {
    e.stopPropagation();
    this.seriesRef.current.scrollIntoView();
    this.props.setTitle(sectionName.SERIES);
    this.props.setTheme('');
    this.props.setDisplay(' transparent-bg');
  };

  bindScrollSnap() {
    const element = this.scrollRef.current;
    if (element) {
      const snapObject = new ScrollSnap(element, snapConfig);
      snapObject.bind();
    }
  }

  render() {
    const { surroundingContainerElement, resetPassword } = this.state;
    const { openLoginModal, location, setTitle, setMenuState } = this.props;
    const queryParams = queryString.parse(location.search);
    const listComponent = {
      Videos: <Videos openLoginModal={openLoginModal} handleScroll={this.handleScroll} />,
      Series: <Series openLoginModal={openLoginModal} setTitle={setTitle} setMenuState={setMenuState} />,
      Topics: <Topics openLoginModal={openLoginModal} setTitle={setTitle} setMenuState={setMenuState} />,
      Footer: <Footer />,
    };

    return (
      <div className="home-page" onScroll={this.onScroll} ref={this.scrollRef}>
        {surroundingContainerElement &&
          Object.entries(listComponent).map(([key, value]) => (
            <VisibilitySensor
              key={key}
              containment={surroundingContainerElement}
              partialVisibility
              minTopValue={window.innerHeight}
              onChange={isVisible => this.onVisibilityChange(isVisible, key)}
            >
              <div ref={key === sectionName.SERIES && this.seriesRef} className={this.getClassName(key)}>
                {value}
              </div>
            </VisibilitySensor>
          ))}
        {resetPassword && (
          <ResetPasswordModal resetToken={queryParams && queryParams.resetToken}>Reset Password</ResetPasswordModal>
        )}
        {queryParams && queryParams.setPasswordToken && (
          <SetPasswordModal setPasswordToken={queryParams.setPasswordToken} loginUser={this.props.loginUser}>
            Set Password
          </SetPasswordModal>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(mapStateToProps, dispatch => bindActionCreators(actionCreator, dispatch))(
  withOrientationChange(Home)
);
