import React from 'react';
import {
  View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './BookmarkStyle';
import BookmarkImage from '../../../assets/images/bookmark.png';
import Book from '../../../assets/images/reading.png';

export default function Bookmark({
  resourceName, author,
}) {
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
        <Image source={BookmarkImage} />
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
