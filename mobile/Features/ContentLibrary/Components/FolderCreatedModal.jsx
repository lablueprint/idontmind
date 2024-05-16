import React from 'react';
import {
  View, Text, Modal, Image, Pressable, TouchableWithoutFeedback, Keyboard,
} from 'react-native';

import PropTypes from 'prop-types';
import exit from '../../../assets/images/exit.png';
import check from '../../../assets/images/green_check.png';
import styles from './FolderModalStyle';

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
                textDecorationLine: 'underline', fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: '#676C6C', paddingBottom: 15,
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

export default FolderCreatedModal;

FolderCreatedModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  newFolderName: PropTypes.string.isRequired,
};
