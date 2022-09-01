import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Carousel from 'react-multi-carousel';
import actionCreator from '../../store/actions/EditorPicksActions';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const Picks = props => {
  const { editorPicks } = props;
  if (!editorPicks) {
    props.getEditorPicks();
  }

  const rawMarkupFun = data => {
    const rawMarkup = data;
    return { __html: rawMarkup };
  };

  return (
    <div className="picks-section">
      <div className="picks-wrapper">
        {editorPicks && editorPicks.length > 0 && (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={false}
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl
            transitionDuration={500}
            customTransition="transform 300ms ease-in-out"
          >
            {editorPicks.map(item => (
              // eslint-disable-next-line react/no-danger
              <div key={item.id} dangerouslySetInnerHTML={rawMarkupFun(item.embeddedCode)} />
            ))}
          </Carousel>
        )}
      </div>
      <div className="btn-wrapper text-center">
        <button
          className="btn blue-btn"
          onClick={() => {
            window.location = 'https://www.facebook.com/millionstoriesmedia/';
            return null;
          }}
        >
          {/* <Facebook iconWidth="24" iconHeight="23" iconfill="#F1F1F1" /> */}
          SEE MORE PICKS
        </button>
      </div>
    </div>
  );
};

export default connect(
  state => state.picks,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(Picks);
