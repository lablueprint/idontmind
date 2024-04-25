import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable,
  TextInput, TouchableWithoutFeedback, Keyboard,
} from 'react-native';

import PropTypes from 'prop-types';
import exit from '../../../assets/exit.png';

function NewFolderModal({ modalVisibleParent, toggleModal }) {
  const [folderNameText, setFolderNameText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  const handleInputChange1 = (text) => {
    setFolderNameText(text);
  };
  const handleInputChange2 = (text) => {
    setDescriptionText(text);
  };

  const handleSave = () => {
    // Handle saving the input text
    console.log('Input Text:', inputText);
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
              <Pressable title="Save" onPress={handleSave} />
              <Pressable title="Close" onPress={toggleModal} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Pressable style={styles.saveButton}>
                <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: 'white' }}>Save</Text>
              </Pressable>
            </View>
          </View>

        </View>

      </TouchableWithoutFeedback>

    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',

  },
  inputFolder: {
    height: 33,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#C6CECE',
    borderRadius: 8,

  },
  inputDescription: {
    height: 48,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#C6CECE',
    borderRadius: 8,

  },
  saveButton: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#374342',

  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default NewFolderModal;

NewFolderModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
