import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable,
  TextInput, TouchableWithoutFeedback, Keyboard,
} from 'react-native';

import PropTypes from 'prop-types';
import exit from '../../../assets/exit.png';
import check from '../../../assets/green_check.png';

function FolderCreatedModal({ modalVisibleParent, toggleModal, newFolderName }) {
  const handleOK = () => {
    // Handle saving the input text
    console.log('pressed OK');
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
                Successfully Created!
              </Text>
              <Text style={{
                fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: '#676C6C',
              }}
              >
                The resource is now in your folder
              </Text>
              <Text style={{
                textDecorationLine: 'underline', ontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: '#676C6C', paddingBottom: 15,
              }}
              >
                {' '}
                {newFolderName}
                .
              </Text>

            </View>
            <View style={{ alignItems: 'center' }}>
              <Pressable style={styles.saveButton} onPress={handleOK}>
                <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: 'white' }}>OK</Text>
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
    backgroundColor: '#DFE5E5',
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

export default FolderCreatedModal;

FolderCreatedModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  newFolderName: PropTypes.string.isRequired,
};
