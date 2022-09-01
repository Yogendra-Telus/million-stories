import React from 'react';
import CloseIcon from '../common/Icons/Close';

const PlaylistItem = props => {
  const handleRemove = () => {
    props.handleRemoveMediaFromPlaylist(props.mediaId);
  };
  return (
    <div className="edit-modal-list">
      <div className="image_wrapper">
        <img src={props.thumbnail} alt="" />
      </div>
      <div className="content_wrapper">
        <h4>{props.title}</h4>
      </div>
      <button onClick={handleRemove} className="icon-btn" type="button">
        <CloseIcon role="button" iconfill="#707070" iconWidth="15" iconHeight="15" />
      </button>
    </div>
  );
};

export default PlaylistItem;
