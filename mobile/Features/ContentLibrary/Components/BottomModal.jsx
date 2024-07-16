import React, { useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, Image, ScrollView, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import folderDark from '../../../assets/images/folder_dark.png';
        import check from '../../../assets/images/green_check.png';
import bookmark from '../../../assets/images/bookmark_dark.png';
import add from '../../../assets/images/addbutton.png';
import styles from './BottomModalStyle';

function FolderModalHeader({
  title, description, icon, iconSize,
}) {
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

FolderModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  iconSize: PropTypes.string.isRequired,
};

function FolderModalRow({
  title, description, isAdded,
}) {
  const [added, setAdded] = useState(isAdded);
  const toggleAdded = () => {
    setAdded(!added);
    console.log('toggle add');
  };
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
      <Pressable onPress={toggleAdded}>
        <Image
          style={{
            flex: 1, resizeMode: 'contain', width: 30, height: 30,
          }}
          source={added ? check : add}
        />
      </Pressable>
    </View>

  );
}

FolderModalRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isAdded: PropTypes.bool.isRequired,
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
            <FolderModalHeader title="Folder" description="Compiled for you by you." icon={bookmark} iconSize="150%" />
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
              <FolderModalRow title={page} description="Automatically saved to folder" isAdded />
            </View>
            {folderList.map((item) => (
              <View key={item[0]} style={{ marginVertical: 10 }}>
                <FolderModalRow
                  title={item[0]}
                  description={item[1]}
                  isAdded={false}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default BottomHalfModal;

BottomHalfModal.propTypes = {
  modalVisibleParent: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleModalNewFolder: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};
