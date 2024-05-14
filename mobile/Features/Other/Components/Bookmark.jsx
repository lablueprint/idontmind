import React, { useState } from 'react';
import {
  View, Text, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './BookmarkStyle';
import BookmarkWhite from '../../../assets/images/bookmark.png';
import BookmarkDark from '../../../assets/images/bookmark_dark.png';
import Book from '../../../assets/images/reading.png';

export default function Bookmark({
  resourceName, author,
}) {
  const [bookmarkSelected, setBookmarkSelected] = useState(false); // hardcode it as false for now
  const toggleBookmark = () => {
    setBookmarkSelected(!bookmarkSelected);
    console.log('toggle bookmark selection');
  };
  let authorLine = '';
  if (author) authorLine = 'By:';
  return (
    <View style={style.container}>
      <View style={style.imageContainer1}>
        <Image style={{ resizeMode: 'contain', width: 30, height: 30 }} source={Book} />
      </View>
      <View style={style.textContainer}>
        <Text style={style.nameText}>{resourceName}</Text>
        <Text style={style.authorText}>
          {authorLine}
          {' '}
          {author}
        </Text>
      </View>
      <View style={style.imageContainer2}>
        <Pressable onPress={toggleBookmark}>
          <Image style={{ resizeMode: 'contain', height: 20, width: 20 }} source={bookmarkSelected ? BookmarkDark : BookmarkWhite} />
        </Pressable>
      </View>
    </View>
  );
}

Bookmark.propTypes = {
  resourceName: PropTypes.string,
  author: PropTypes.string,
};

Bookmark.defaultProps = {
  resourceName: '',
  author: '',
};
