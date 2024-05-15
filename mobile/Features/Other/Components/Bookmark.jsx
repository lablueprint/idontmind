import React from 'react';
import {
  View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './BookmarkStyle';
import BookmarkImage from '../../../assets/images/bookmark.png';

export default function Bookmark({
  resourceName, author,
}) {
  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <Text style={[style.whiteText, style.nameText]}>{resourceName}</Text>
        <Text style={[style.whiteText, style.authorText]}>
          By:
          {' '}
          {author}
        </Text>
      </View>
      <View style={style.imageContainer}>
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
