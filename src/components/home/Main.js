import React, { Component } from 'react';
import News from './News';
import Series from './Series';
import Topics from './Topics';
import Picks from './Picks';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/HomeActions';

class Main extends Component {
  componentDidMount() {
    this.props.loadNews();
  }

  render() {
    return (
      <div className="home-page">
        <News updateNews={this.props.updateNews} news={this.props.news} />
        <Series />
        <Topics />
        <Picks />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.HomeReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadNews: () => dispatch(actions.loadNews()),
    updateNews: id => dispatch(actions.updateNews(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
