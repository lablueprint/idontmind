import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from './BookmarkStyle';
import BookmarkFilled from '../../../assets/images/bookmark.png';
import BookmarkUnfilled from '../../../assets/images/unfilledBookmarkWhite.png';

import Book from '../../../assets/images/reading.png';

export default function Bookmark({
  resourceName, author, selected, toggleModal,
}) {
  const { id, authHeader } = useSelector((state) => state.auth);

  const [bookmarkSelected, setBookmarkSelected] = useState(selected);
  useEffect(() => {
    setBookmarkSelected(selected);
  }, [selected]);

  const toggleBookmark = async () => {
    if (!bookmarkSelected) {
      // favorite the tag
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteResource`, { id, resource: resourceName }, { headers: authHeader });
    } else {
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteResource`, { id, resource: resourceName }, { headers: authHeader });
    }
    setBookmarkSelected(!bookmarkSelected);
    if (!bookmarkSelected) {
      // await getFoldersForResource(resourceName);
      toggleModal(false, resourceName);
    }
    // favorite or unfavorite the tag

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
          <Image style={{ resizeMode: 'contain', height: 20, width: 20 }} source={bookmarkSelected ? BookmarkFilled : BookmarkUnfilled} />
        </Pressable>
      </View>
    </View>
  );
}

Bookmark.propTypes = {
  resourceName: PropTypes.string,
  author: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

Bookmark.defaultProps = {
  resourceName: '',
  author: '',
};
