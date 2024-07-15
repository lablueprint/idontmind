import React, { useState } from 'react';
import {
  View, Text, Modal, Image, Pressable,
  TextInput, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './FolderModalStyle';

import exit from '../../../assets/images/exit.png';

function NewFolderModal({
  modalVisibleParent, toggleModal, toggleModalCreated, setFolderName, isTag, tagOrResourceName,
}) {
  const { id, authHeader } = useSelector((state) => state.auth);

  const [folderNameText, setFolderNameText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  const handleInputChange1 = (text) => {
    setFolderNameText(text);
  };
  const handleInputChange2 = (text) => {
    setDescriptionText(text);
  };

  const handleNewFolder = async (folderName, description) => {
    console.log('isTag', isTag);
    console.log('tagOrResourceName', tagOrResourceName);
    try {
      let payload;
      if (!isTag) {
        payload = {
          id, folderName, description, resource: tagOrResourceName,
        };
      } else if (isTag) {
        payload = {
          id, folderName, description, tag: tagOrResourceName,
        };
      }
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/createFavoritedFolder`, payload, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log('This is the create folder data:');
        console.log(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleSave = () => {
    // Handle saving the input text
    console.log('handle save');
    if (folderNameText !== '' && descriptionText !== '') {
      setFolderName(folderNameText);
      toggleModal();
      toggleModalCreated();
      handleNewFolder(folderNameText, descriptionText);
    }
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
            <View>
              <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18 }}>Folder Name</Text>
              <TextInput
                style={styles.inputFolder}
                placeholder="Enter text..."
                onChangeText={handleInputChange1}
                value={folderNameText}
              />
              <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18 }}>Description</Text>
              <TextInput
                style={styles.inputDescription}
                placeholder="Enter text..."
                onChangeText={handleInputChange2}
                value={descriptionText}
              />

            </View>
            <View style={{ alignItems: 'center' }}>
              <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: 'white' }}>Save</Text>
              </Pressable>
            </View>
          </View>

        </View>

      </TouchableWithoutFeedback>

    </Modal>
  );
}

export default NewFolderModal;

NewFolderModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleModalCreated: PropTypes.func.isRequired,
  setFolderName: PropTypes.func.isRequired,
  isTag: PropTypes.bool.isRequired,
  tagOrResourceName: PropTypes.string.isRequired,

};
