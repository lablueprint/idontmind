import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import axios from 'axios';
import style from './ContentStyle';
import starImage from '../../../assets/star.png';
import goldStar from '../../../assets/goldStar.png';
import TagContext from '../Context/TagContext';

export default function Card({
  navigateToTag, index, item,
}) {
  const {
    deleteFavorite, addFavorite, findFavorite,
  } = useContext(TagContext);

  /* Grab item fields */
  const { _id, tagName } = item;

  /* Check if current tag is favorited */
  const favorited = findFavorite(_id);

  /* Adds Tag to Users Favorites List */
  const favoriteTag = async () => {
    addFavorite(_id);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/favoriteTag`, { tag: { id: _id, tagName }, username: 'hi' });
  };

  /* Remove Tag from Users Favorites List */
  const unfavoriteTag = async () => {
    deleteFavorite(_id);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/unfavoriteTag`, { tag: { id: _id, tagName }, username: 'hi' });
  };

  /* Handles Favorite Change */
  const handleFavoriteChange = () => {
    /* checks if the tag is not not in the user's favorite list */
    if (findFavorite(_id) === false) {
      favoriteTag();
    } else {
      unfavoriteTag();
    }
  };

  return (
    <TouchableOpacity
      style={[style.horizontalCard]}
      onPress={() => navigateToTag(index)}
    >
      <TouchableOpacity
        onPress={() => handleFavoriteChange()}
      >
        <Image
          style={[style.star,
            { alignSelf: 'flex-end' },
          ]}
          source={favorited === false ? starImage : goldStar}
        />
      </TouchableOpacity>
      <View
        style={[style.horizontalCardInfo]}
      >
        <Text
          style={[style.horizontalText]}
        >
          {tagName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

Card.propTypes = {
  navigateToTag: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string,
    tagName: PropTypes.string,
  }).isRequired,
};
