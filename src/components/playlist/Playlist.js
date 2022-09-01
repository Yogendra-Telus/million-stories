import React from 'react';
import { connect } from 'react-redux';
import Playlist from '../../assets/images/extra-images/thumbnail.jpg';
import * as actions from '../../store/actions/HomeActions';

const Media = () => (
  <>
    <section className="playlistwrapper">
      <div className="playlist_banner">
        <span>My Investments Playlist</span>
        <button className="share-button">
          <i className="far fa-paper-plane" />
          Share
        </button>
        <p>11 Videos</p>
        <button>
          Play All
          <i className="fas fa-play" />
        </button>
      </div>
      <div className="container-fluid playlist_content">
        <div className="row card-container">
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
          <div className="container-fluid playlist_content">
            <div className="row card-container">
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
            </div>
            <div className="row card-container">
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
            </div>
            <div className="row card-container">
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
            </div>
            <div className="row card-container">
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
              <div className="col-md-4 col-xs-12 card-wrapper">
                <img src={Playlist} alt="" />
                <h3 className="heading">Learn how to save your money with the 30% rule</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
        </div>
        <div className="row card-container">
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
        </div>
        <div className="row card-container">
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
        </div>
        <div className="row card-container">
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
          <div className="col-md-4 col-xs-12 card-wrapper">
            <img src={Playlist} alt="" />
            <h3 className="heading">Learn how to save your money with the 30% rule</h3>
          </div>
        </div>
      </div>
    </section>
  </>
);

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
)(Media);
