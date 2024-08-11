import React, { useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, Image, ScrollView, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
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
  folderName, description, isAdded, isTag, tagOrResourceName,
}) {
  const { id, authHeader } = useSelector((state) => state.auth);

  const [added, setAdded] = useState(isAdded);
  const addToFolder = async () => {
    try {
      let payload;
      if (!isTag) {
        payload = { id, folderName, resource: tagOrResourceName };
      } else if (isTag) {
        payload = { id, folderName, tag: tagOrResourceName };
      }
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/addToFolder`, payload, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteFromFolder = async () => {
    try {
      let payload;
      if (!isTag) {
        payload = { id, folderName, resource: tagOrResourceName };
      } else if (isTag) {
        payload = { id, folderName, tag: tagOrResourceName };
      }
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/folder/deleteFromFolder`, payload, { headers: authHeader });
      if (res.data.error) {
        console.error(res.data.error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const toggleAdded = () => {
    if (!added) {
      addToFolder();
    } else {
      deleteFromFolder();
    }
    console.log('toggle add');
    if (folderName !== 'Tags' && folderName !== 'Resources') {
      setAdded(!added);
    }
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
        <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18 }}>{folderName}</Text>
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
  folderName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isAdded: PropTypes.bool.isRequired,
  isTag: PropTypes.bool.isRequired,
  tagOrResourceName: PropTypes.string.isRequired,
};

function BottomHalfModal({
  modalVisibleParent, toggleModal, toggleModalNewFolder, isTag, folders,
  tagOrResourceName,
}) {
  const handleNewFolder = () => {
    toggleModal();
    toggleModalNewFolder();
  };

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
            {Object.entries(folders).map(([key, value]) => (
              <View key={key} style={{ marginVertical: 10 }}>
                <FolderModalRow
                  folderName={key}
                  description={value.description}
                  isAdded={false}
                  isTag={isTag}
                  tagOrResourceName={tagOrResourceName}
                />
              </View>
            ))}
            <View style={{ height: 50 }} />

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
  isTag: PropTypes.bool.isRequired,
  folders: PropTypes.objectOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      resources: PropTypes.arrayOf(PropTypes.string).isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  tagOrResourceName: PropTypes.string.isRequired,
};
