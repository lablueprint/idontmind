import React from 'react';
import {
  View, Text, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import style from '../Screens/BookmarksStyle';
import folderImg from '../../../assets/images/folderIcon.png';
import folderDelete from '../../../assets/images/folderDelete.png';

export default function Folder({
  navigation, folderName, folderDescription, tags, resources,
  toggleModalNewFolder, editFolderToDelete, toggleModalDelete,
}) {
  const navigateToFolderContent = () => {
    navigation.navigate('FolderContent', {
      folderName, folderDescription, tags, resources,
    });
  };

  const handleDelete = () => {
    console.log('delete');
    editFolderToDelete(folderName);
    toggleModalDelete();
  };

  if (folderName.length !== 0) {
    return (
      <Pressable onPress={navigateToFolderContent}>
        <View style={style.folderContainer}>
          <Pressable onPress={handleDelete}>
            <Image
              style={{
                marginTop: '-20%', marginLeft: '110%', resizeMode: 'contain', height: 20, width: 20,
              }}
              source={folderDelete}
            />
          </Pressable>

          <Image style={{ resizeMode: 'contain', height: 40, width: 40 }} source={folderImg} />
          <Text style={{ fontSize: 14, fontFamily: 'cabinet-grotesk-regular' }}>{folderName}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => {
      toggleModalNewFolder();
    }}

    >
      <View style={style.addContainer}>
        <Text style={style.plus}>+</Text>
      </View>
    </Pressable>

  );
}

Folder.propTypes = {
  folderName: PropTypes.string,
  folderDescription: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  resources: PropTypes.arrayOf(PropTypes.string),
  toggleModalNewFolder: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Folder.defaultProps = {
  folderName: '',
  folderDescription: '',
  tags: [],
  resources: [],
};
