import React, { useState } from 'react';
import {
  View, Text, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './TagRectangleStyle';
import BookmarkWhite from '../../../assets/images/bookmark.png';
import BookmarkDark from '../../../assets/images/bookmark_dark.png';

import TagFill from '../../../assets/images/tag_fill.png';

export default function TagRectangle({
  tagName,
}) {
  const [bookmarkSelected, setBookmarkSelected] = useState(true); // hardcode it as true for now
  const toggleBookmark = () => {
    setBookmarkSelected(!bookmarkSelected);
    console.log('toggle bookmark selection');
  };
  return (
    <View style={style.container}>
      <View style={style.imageContainer1}>
        <Image style={{ resizeMode: 'contain', width: 30, height: 30 }} source={TagFill} />
      </View>
      <View style={style.textContainer}>
        <Text style={[style.whiteText, style.nameText]}>{tagName}</Text>
      </View>
      <Pressable style={style.imageContainer2} onPress={toggleBookmark}>
        <Image style={{ resizeMode: 'contain', height: 20, width: 20 }} source={bookmarkSelected ? BookmarkDark : BookmarkWhite} />
      </Pressable>
    </View>
  );
}

TagRectangle.propTypes = {
  tagName: PropTypes.string,
};

TagRectangle.defaultProps = {
  tagName: '',
};
