import React, { useState, useEffect } from 'react';
import { withFormik } from 'formik';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CustomModal from '../ModelComponents/CustomModal';
import CustomField from '../ModelComponents/CustomField';
import { AntInput } from '../ModelComponents/AntField';
import ValidationEditPlaylist from '../modal/ValidationPlaylist';
import PlaylistItem from '../myAccount/PlaylistItem';
import { GET_PLAYLIST_MEDIA } from '../../store/actions/ActionTypes';

const EditPlaylistModal = props => {
  const { playlist, type } = props;
  const { name } = playlist;
  const [playlistMedia, setPlaylistMedia] = useState(props.playlistMedia);

  useEffect(() => {
    switch (type) {
      case GET_PLAYLIST_MEDIA:
        setPlaylistMedia(props.playlistMedia);
        break;
      default:
        break;
    }
  }, [props.playlistMedia, type]);

  const handleEditPlaylist = submitValues => {
    const mediaIds = playlistMedia.map(item => item.id);
    const playlistMediaData = { playlistName: submitValues.name, updatedMediaIds: mediaIds };
    props.handleEditPlaylist(props.userId, submitValues.playlist.playlistId, playlistMediaData);
    if (props.resetForm) {
      props.resetForm();
    }
  };

  const handleRemoveMediaFromPlaylist = mediaId => {
    const newPlaylistMedia = playlistMedia.filter(item => item.id !== mediaId);
    setPlaylistMedia(newPlaylistMedia);
  };

  // eslint-disable-next-line no-unused-vars
  const deletePlaylist = () => {
    if (props.handleDeletePlaylist(playlist.playlistId)) props.toggleEditModal();
  };

  const grid = 8;

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setPlaylistMedia(result);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '100%',
  });
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    reorder(playlistMedia, result.source.index, result.destination.index);
  };

  return (
    <>
      <div className="login-modal">
        <CustomModal
          visible={props.isEditModalVisible}
          onCancel={props.toggleEditModal}
          submit={submitValues => handleEditPlaylist(submitValues)}
          title="Edit Playlist"
          okText="Save Changes"
          cancelText="Cancel"
          className="custom-modal gray-modal edit-playlist"
          {...props}
        >
          <div className="modal-body">
            <CustomField
              defaultValue={name}
              name="name"
              id="name"
              component={AntInput}
              placeholder="Playlist Name"
              label="Playlist Name"
            />
            <div className="subtitle-container">
              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label>Drag and Drop to reorder videos</label>
              <button type="button" className="delete-btn-link" onClick={deletePlaylist}>
                <i className="far fa-delete" />
                Delete Playlist
              </button>
            </div>
            {props.isEditModalVisible && playlistMedia && playlistMedia.length > 0 && (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      className="modal-list-wrapper"
                    >
                      {playlistMedia.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {/* eslint-disable-next-line no-shadow */}
                          {(provided, snapshot) => (
                            <div
                              className="playlist-container"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              <PlaylistItem
                                key={item.id}
                                mediaId={item.id}
                                title={item.title}
                                thumbnail={item.thumbnail}
                                handleRemoveMediaFromPlaylist={handleRemoveMediaFromPlaylist}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </CustomModal>
      </div>
    </>
  );
};

export default withFormik({ validationSchema: ValidationEditPlaylist })(EditPlaylistModal);
