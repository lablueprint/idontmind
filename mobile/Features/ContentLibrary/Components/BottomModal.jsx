import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import Bookmark from '../../Other/Components/Bookmark';
import folderDark from '../../../assets/images/folder_dark.png';
import check from '../../../assets/images/green_check.png';
import bookmark from '../../../assets/images/bookmark_dark.png';
import add from '../../../assets/images/addbutton.png';

function FolderModalRow({
  title, description, icon, iconSize,
}) {
  //   const [modalVisible, setModalVisible] = useState(false);
  //   useEffect(() => {
  //     // Update the local state whenever modalVisibleParent changes
  //     setModalVisible(modalVisibleParent);
  //     console.log('setmodal');
  //   }, [modalVisibleParent]);

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
        <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18 }}>{title}</Text>
        <Text style={{ fontFamily: 'cabinet-grotesk-regular', color: '#767C7C', fontSize: 16 }}>
          {description}
        </Text>
      </View>
      <Image
        style={{
          flex: 1, resizeMode: 'contain', width: iconSize, height: iconSize,
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

function BottomHalfModal({
  modalVisibleParent, toggleModal, toggleModalNewFolder, page,
}) {
//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     // Update the local state whenever modalVisibleParent changes
//     setModalVisible(modalVisibleParent);
//     console.log('setmodal');
//   }, [modalVisibleParent]);

  const handleNewFolder = () => {
    toggleModal();
    toggleModalNewFolder();
  };

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
          <TouchableOpacity style={styles.header} onPress={toggleModal}>
            <FolderModalRow title="Folder" description="Compiled for you by you." icon={bookmark} iconSize="150%" />
          </TouchableOpacity>

          <ScrollView style={styles.collections}>
            <View style={styles.collectionsHeader}>
              <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18 }}>Collections</Text>
              <Pressable>
                <Text
                  style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18, color: '#326771' }}
                  onPress={handleNewFolder}
                >
                  New Folder
                </Text>
              </Pressable>
            </View>
            <View style={{ marginVertical: 10 }}>
              <FolderModalRow title={page} description="Automatically saved to folder" icon={check} iconSize="60%" />
            </View>
            {folderList.map((item) => (
              <View style={{ marginVertical: 10 }}>
                <FolderModalRow key={item[0]} title={item[0]} description={item[1]} icon={add} iconSize="60%" />
              </View>
            ))}
          </ScrollView>
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
    flex: 0.1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#DFE5E5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  collections: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomHalfModal;

BottomHalfModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleModalNewFolder: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};
