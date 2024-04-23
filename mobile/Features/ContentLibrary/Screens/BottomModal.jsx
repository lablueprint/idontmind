import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Bookmark from '../../Other/Components/Bookmark';
import folderDark from '../../../assets/folder_dark.png';
import check from '../../../assets/green_check.png';
import bookmark from '../../../assets/bookmark_dark.png';

function FolderModalRow({
  title, description, icon, iconSize,
}) {
  //   const [modalVisible, setModalVisible] = useState(false);
  //   useEffect(() => {
  //     // Update the local state whenever modalVisibleParent changes
  //     setModalVisible(modalVisibleParent);
  //     console.log('setmodal');
  //   }, [modalVisibleParent]);
  console.log(iconSize);

  return (
    <View style={styles.folderRow}>
      <Image
        style={{
          flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        source={folderDark}
      />
      <View style={{
        flex: 5, paddingLeft: 30,
      }}
      >
        <Text>{title}</Text>
        <Text style={{ color: '#767C7C' }}>
          {description}
        </Text>
      </View>
      <Image
        style={{
          flex: 1, resizeMode: 'contain', width: '50%', height: '50%',
        }}
        source={icon}
      />
    </View>

  );
}

FolderModalRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  iconSize: PropTypes.string.isRequired,
};

function BottomHalfModal({ modalVisibleParent, toggleModal, page }) {
//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     // Update the local state whenever modalVisibleParent changes
//     setModalVisible(modalVisibleParent);
//     console.log('setmodal');
//   }, [modalVisibleParent]);

  const folderList = [['Artistry', 'description'], ['Haha You Suck', 'description 2']];
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
            <FolderModalRow title="Folder" description="Compiled for you by you." icon={bookmark} iconSize="60%" />
          </View>

          <TouchableOpacity style={styles.collections} onPress={toggleModal}>
            <View style={styles.collectionsHeader}>
              <Text>Collections</Text>
              <Text>New Folder</Text>
            </View>
            <FolderModalRow title={page} description="Automatically saved to folder" icon={check} iconSize="30%" />

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
    padding: 30,
  },
  collections: {
    flex: 3,
    display: 'flex',
    backgroundColor: '#C6CECE',
    flexDirection: 'column',
    padding: 30,

  },
  collectionsHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  folderRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },

});

export default BottomHalfModal;

BottomHalfModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};
