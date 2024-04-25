import React from 'react';
import {
  View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './TagRectangleStyle';
import BookmarkImage from '../../../assets/bookmark_dark.png';

export default function TagRectangle({
  tagName,
}) {
  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <Text style={[style.whiteText, style.nameText]}>{tagName}</Text>
      </View>
      <View style={style.imageContainer}>
        <Image style={{ width: 20, height: 20 }} source={BookmarkImage} />
      </View>
    </View>
  );
}

TagRectangle.propTypes = {
  tagName: PropTypes.string,
};

TagRectangle.defaultProps = {
  tagName: '',
};
