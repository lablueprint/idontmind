import {
  Text, View, TouchableOpacity, Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from './RecommendationCardStyle';
import Bookmark from '../../../assets/images/bookmark_fill.png';
import emptyBookmark from '../../../assets/images/emptyBookmark.png';
import TagContext from '../Context/TagContext';
import subTopicDict from './subTopicDict';
import CategoryDict from './CategoryDict';

export default function RecommendationCard({
  navigateToResourceList, tagName,
}) {
  const {
    deleteFavorite, addFavorite, findFavorite,
  } = useContext(TagContext);
  const { id, authHeader } = useSelector((state) => state.auth);

  const category = subTopicDict[tagName.toLowerCase()];

  /* Check if current tag is favorited */
  const favorited = findFavorite(tagName);

  /* Adds Tag to Users Favorites List */
  const favoriteTag = async () => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteTag`, { tagName, id }, { headers: authHeader });
    if (res.status === 200) {
      addFavorite(tagName);
    }
  };

  // /* Remove Tag from Users Favorites List */
  const unfavoriteTag = async () => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteTag`, { tagName, id }, { headers: authHeader });
    if (res.status === 200) {
      deleteFavorite(tagName);
    }
  };

  /* Handles Favorite Change */
  const handleFavoriteChange = () => {
    /* checks if the tag is not not in the user's favorite list */
    if (findFavorite(tagName) === false) {
      favoriteTag();
    } else {
      unfavoriteTag();
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[style.recommendationCard, { width: 295 }]}
        onPress={() => { navigateToResourceList(tagName); }}
      >
        <View style={[style.row]}>
          <View
            style={[style.recommendationCardInfo]}
          >
            <Text
              style={[style.recommendationText]}
            >
              {tagName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleFavoriteChange()}
          >
            <Image
              style={[style.bookmark,
                { alignSelf: 'flex-end' },
              ]}
              source={favorited === false ? emptyBookmark : Bookmark}
            />
          </TouchableOpacity>
        </View>
        <View style={[style.recommendationCardInfo]}>
          <Image
            style={[style.recommendationImage]}
            source={CategoryDict[category].image}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

RecommendationCard.propTypes = {
  navigateToResourceList: PropTypes.func.isRequired,
  tagName: PropTypes.string.isRequired,
};
