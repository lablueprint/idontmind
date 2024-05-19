import React from 'react';
import {
  View, Text, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import style from '../Screens/BookmarksStyle';
import folderImg from '../../../assets/images/folderIcon.png';

export default function Folder({
  folderName,
}) {
  if (folderName.length !== 0) {
    return (
      <Pressable onPress={() => {
        console.log(folderName);
      }}
      >
        <View style={style.folderContainer}>
          <Image style={{ resizeMode: 'contain', height: 40, width: 40 }} source={folderImg} />
          <Text style={{ fontSize: 14, fontFamily: 'cabinet-grotesk-regular' }}>{folderName}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => {
      console.log('add');
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
};

Folder.defaultProps = {
  folderName: '',
};
