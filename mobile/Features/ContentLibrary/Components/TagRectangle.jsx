import React from 'react';
import {
  View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './TagRectangleStyle';
import BookmarkImage from '../../../assets/bookmark_dark.png';
import TagFill from '../../../assets/images/tag_fill.png';

export default function TagRectangle({
  tagName,
}) {
  return (
    <View style={style.container}>
      <View style={style.imageContainer1}>
        <Image style={{ resizeMode: 'contain', width: 30, height: 30 }} source={TagFill} />
      </View>
      <View style={style.textContainer}>
        <Text style={[style.whiteText, style.nameText]}>{tagName}</Text>
      </View>
      <View style={style.imageContainer2}>
        <Image style={{ resizeMode: 'contain', height: 20, width: 20 }} source={BookmarkImage} />
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
