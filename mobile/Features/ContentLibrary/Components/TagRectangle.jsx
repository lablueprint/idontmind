import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from './TagRectangleStyle';
import BookmarkWhite from '../../../assets/images/unfilledBookmarkDark.png';
import BookmarkDark from '../../../assets/images/bookmark_dark.png';

import TagFill from '../../../assets/images/tag_fill.png';

export default function TagRectangle({
  tagName, selected, toggleModal,
}) {
  const { id, authHeader } = useSelector((state) => state.auth);

  const [bookmarkSelected, setBookmarkSelected] = useState(selected);
  useEffect(() => {
    setBookmarkSelected(selected);
  }, [selected]);

  const toggleBookmark = async () => {
    if (!bookmarkSelected) {
      // favorite the tag
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteTag`, { id, tag: tagName }, { headers: authHeader });
    } else {
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteTag`, { id, tag: tagName }, { headers: authHeader });
    }
    setBookmarkSelected(!bookmarkSelected);
    if (!bookmarkSelected) {
      // await getFoldersForResource(resourceName);
      toggleModal(tagName);
    }
    // favorite or unfavorite the tag

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
  toggleModal: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

TagRectangle.defaultProps = {
  tagName: '',
};
