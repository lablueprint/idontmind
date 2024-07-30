import React from 'react';
import {
  View, Text, Modal, Image, Pressable, TouchableWithoutFeedback, Keyboard,
} from 'react-native';

import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import exit from '../../../assets/images/exit.png';
import check from '../../../assets/images/green_check.png';
import styles from './FolderModalStyle';

function DeleteFolderModal({
  modalVisibleParent, toggleModal, deleteName, updateFolders,
}) {
  const {
    authHeader, id,
  } = useSelector((state) => state.auth);

  // delete a folder
  const deleteFolder = async () => {
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/deleteFavoritedFolder`, { id, folderName: deleteName }, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        updateFolders(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleOK = () => {
    // delete folder
    deleteFolder();
    toggleModal();
  };

  return (
    <Modal
      visible={modalVisibleParent}
      transparent
      animationType="fade"
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <View style={{ alignItems: 'flex-end' }}>
              <Pressable onPress={toggleModal}>
                <Image style={{ width: 20, height: 20 }} source={exit} />
              </Pressable>
            </View>
            <View style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <Image
                style={{
                  resizeMode: 'contain', width: 50, height: 50, paddingBottom: 10,
                }}
                source={check}
              />
              <Text style={{
                fontFamily: 'cabinet-grotesk-regular', fontSize: 24, paddingTop: 15, paddingBottom: 10,
              }}
              >
                Delete this Folder?
              </Text>
              <Text style={{
                fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: '#676C6C',
              }}
              >
                Are you sure you want to delete this folder? This action cannot be undone.
              </Text>

            </View>
            <View style={{ alignItems: 'center' }}>
              <Pressable style={styles.saveButton} onPress={handleOK}>
                <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: 'white' }}>Confirm Deletion</Text>
              </Pressable>
            </View>
          </View>

        </View>

      </TouchableWithoutFeedback>

    </Modal>
  );
}

export default DeleteFolderModal;

DeleteFolderModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  deleteName: PropTypes.string.isRequired,
  updateFolders: PropTypes.func.isRequired,
};
