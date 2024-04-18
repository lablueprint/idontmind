import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Bookmark from '../../Other/Components/Bookmark';

function BottomHalfModal({ modalVisibleParent, toggleModal }) {
//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     // Update the local state whenever modalVisibleParent changes
//     setModalVisible(modalVisibleParent);
//     console.log('setmodal');
//   }, [modalVisibleParent]);

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisibleParent}
        onRequestClose={toggleModal}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text>This is the bottom half modal content</Text>
            <Bookmark
                        // key={resourceName}
              resourceName="name"
              author="author"
            />
          </View>

          <TouchableOpacity style={styles.collections} onPress={toggleModal}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zindex: 2,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40%',
    borderRadius: 20,
    backgroundColor: 'white',

    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collections: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});

export default BottomHalfModal;

BottomHalfModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
};
