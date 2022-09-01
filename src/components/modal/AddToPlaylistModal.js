import React, { useEffect } from 'react';
import AddCircleIcon from '../common/Icons/AddCircle';
import AddIcon from '../common/Icons/Add';
import CustomModal from '../ModelComponents/CustomModal';

const AddToPlaylistModal = ({
  addToPlaylistModal,
  toggleCreatePlaylistModal,
  toggleAddPlaylistModal,
  playlists = [],
  onAddToPlaylist,
  ...props
}) => {
  useEffect(
    () => () => {
      document.querySelectorAll('video.jw-video') &&
        document.querySelectorAll('video.jw-video').length &&
        document.querySelectorAll('video.jw-video')[0].focus();
    },
    [addToPlaylistModal]
  );
  return (
    <CustomModal
      title="Add to Playlist"
      visible={addToPlaylistModal}
      footer={null}
      className="add-modal custom-modal gray-modal"
      onCancel={toggleAddPlaylistModal}
      {...props}
    >
      <div className="playlist title">My Playlists</div>
      <div className="playlists">
        {playlists.length > 0 &&
          playlists.map(item => (
            <div
              className="playlist"
              key={item.playlistId}
              onClick={() => {
                onAddToPlaylist(item.playlistId);
                toggleAddPlaylistModal();
              }}
              onKeyDown={() => {
                onAddToPlaylist(item.playlistId);
                toggleAddPlaylistModal();
              }}
              role="button"
              tabIndex="0"
            >
              <span>
                {item.name}
                <AddIcon iconfill="#F1F1F1" iconWidth="15" />
              </span>
            </div>
          ))}
      </div>
      <div
        className="create-new btn light-transparent-btn"
        onClick={toggleCreatePlaylistModal}
        role="button"
        tabIndex="0"
        onKeyDown={toggleCreatePlaylistModal}
      >
        <AddCircleIcon />
        <span>Create New Playlist</span>
      </div>
    </CustomModal>
  );
};

export default AddToPlaylistModal;
