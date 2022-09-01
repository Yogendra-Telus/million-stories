import React from 'react';

import { withFormik } from 'formik';

import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntInput } from '../ModelComponents/AntField';

function CreatePlaylistModal({ onAddPlaylist, toggleCreatePlaylistModal, createPlaylistModal, ...props }) {
  return (
    <CustomModal
      title="Create New Playlist"
      visible={createPlaylistModal}
      className="create-modal custom-modal gray-modal"
      onCancel={() => {
        if (props.resetForm) {
          props.resetForm();
        }
        toggleCreatePlaylistModal();
      }}
      okText="Ok"
      {...props}
      onOk={() => {
        onAddPlaylist(props.values.playlist);
        toggleCreatePlaylistModal();
      }}
      okButtonProps={{ disabled: !props.values.playlist }}
    >
      <CustomField
        name="playlist"
        component={AntInput}
        label="Playlist Name"
        maxLength={48}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            onAddPlaylist(props.values.playlist);
            toggleCreatePlaylistModal();
          }
        }}
      />
    </CustomModal>
  );
}
export default withFormik({})(CreatePlaylistModal);
