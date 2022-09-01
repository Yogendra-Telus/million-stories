/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductItem from '../ModelComponents/ProductItem';
import * as Constants from '../../config/Constants';
import AppConfig from '../../config/AppConfig';
import actionCreator from '../../store/actions/SharedPlaylist';
import ShareIcon from '../common/Icons/Share';
import PlayIcon from '../common/Icons/Play2';
// import decryptText from '../../utility/CryptoHelper';

const SharedPlaylist = ({ match, videos, videoCount, ...props }) => {
  const { sharedPlaylistId } = match.params;
  const [page, setPage] = useState(AppConfig.DefaultPage);
  // const PlaylistId = decryptText(sharedPlaylistId);
  const PlaylistId = sharedPlaylistId;
  const loadMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    if (PlaylistId) {
      props.getPlaylistMedia(PlaylistId, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PlaylistId, page]);

  return (
    <div className="shareplaylist-page">
      <section className="header-section">
        <div className="data-wrapper">
          <div className="heading-buttons-wrapper">
            <h1 className="heading">topicTitle</h1>
            <div className="button-wrapper">
              <button className="btn light-transparent-btn">
                <ShareIcon iconWidth="20" iconHeight="20" iconfill="#ffffff" />
                <span>SHARE</span>
              </button>
            </div>
          </div>
          <div className="content">{videos && videos.length && <p>{`${videos.length} VIDEOS`}</p>}</div>
          <button className="btn light-transparent-btn">
            <span>play</span>
            <PlayIcon iconWidth="20" iconHeight="20" iconfill="#F1F1F1" />
          </button>
        </div>
      </section>
      <div className="shareplaylist-content">
        <div className="shareplaylist-wrapper card-container custom-card-container">
          {videos &&
            videos.length &&
            videos.map(item => {
              const { thumbnail, title, id, url } = item;
              return (
                <ProductItem
                  key={id}
                  item={{
                    id,
                    title,
                    thumbnail,
                    Url: url,
                  }}
                  isAddToPlayList={false}
                  href={`?video=${id}&playlist=${PlaylistId}`}
                />
              );
            })}
        </div>
      </div>
      {videoCount > page * AppConfig.DefaultItemCount && (
        <div className="load-more-wrapper">
          <button className="btn dark-transparent-btn" onClick={loadMore}>
            <i className="fa fa-repeat" />
            {`${Constants.loadMoreCaption} ${Constants.MEDIA_TYPE.VIDEO}s`}
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  videos: state.sharedPlaylist.videos,
  videoCount: state.sharedPlaylist.totalCount,
});

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreator, dispatch)
)(SharedPlaylist);
