import React from 'react';
import {
  View, Text, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './BookmarksStyle';
import folderImg from '../../../assets/folder.png';

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
          <Image source={folderImg} />
          <Text>{folderName}</Text>
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
