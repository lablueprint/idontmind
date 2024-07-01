import {
  Text, View, TouchableOpacity, Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from './ContentStyle';
import starImage from '../../../assets/images/star.png';
import goldStar from '../../../assets/images/goldStar.png';
import Bookmark from '../../../assets/images/bookmark_fill.png';
import emptyBookmark from '../../../assets/images/emptyBookmark.png';
import TagContext from '../Context/TagContext';
import Relationships from '../../../assets/images/Relationships.png';
import Coping from '../../../assets/images/coping.png';
import Emotional from '../../../assets/images/emotional.png';
import identity from '../../../assets/images/identity.png';
import Lifestyle from '../../../assets/images/lifestyle.png';
import Mental from '../../../assets/images/mental.png';
import Support from '../../../assets/images/support.png';
import Trauma from '../../../assets/images/trauma.png';
import Improvement from '../../../assets/images/improvement.png';

export default function Card({
  navigateToTag, index, item, orientation,
}) {
  const {
    deleteFavorite, addFavorite, findFavorite,
  } = useContext(TagContext);
  const { email, authHeader } = useSelector((state) => state.auth);

  const { width } = Dimensions.get('window');

  /* image dict */
  const imageDict = {
    relationships: Relationships,
    coping: Coping,
    ewb: Emotional,
    identity,
    lifestyle: Lifestyle,
    mental: Mental,
    self: Improvement,
    support: Support,
    trauma: Trauma,
  };
  /* subtopics color dict */
  const subTopicColorDict = {
    Relationships: '#556A93',
    Coping: '#BD2B2B',
    'Emotional Well-Being': '#ED713E',
    'Identity + Self - Perception': '#CCA827',
    'Lifestyle + Wellness': '#438373',
    'Mental Health Condition': '#91A8D1',
    'Self-Improvement + Growth': '#6E6891',
    Support: '#A86969',
    'Trauma + Recovery': '#9B8C8C',
  };

  /* Grab item fields */
  const { id, tagName, category } = item;

  /* Check if current tag is favorited */
  const favorited = findFavorite(id);

  /* Adds Tag to Users Favorites List */
  const favoriteTag = async () => {
    addFavorite(id);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/favoriteTag`, { tag: { id, tagName }, email }, { headers: authHeader });
  };

  /* Remove Tag from Users Favorites List */
  const unfavoriteTag = async () => {
    deleteFavorite(id);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/unfavoriteTag`, { tag: { id, tagName }, email }, { headers: authHeader });
  };

  /* Handles Favorite Change */
  const handleFavoriteChange = () => {
    /* checks if the tag is not not in the user's favorite list */
    if (findFavorite(id) === false) {
      favoriteTag();
    } else {
      unfavoriteTag();
    }
  };

  return (
    <View>
      { orientation === 'horizontal' ? (
        <TouchableOpacity
          style={[style.horizontalCard, { width: 295 }]}
          onPress={() => navigateToTag(index)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View
              style={[style.horizontalCardInfo]}
            >
              <Text
                style={[style.horizontalText]}
              >
                {tagName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleFavoriteChange()}
            >
              <Image
                style={[style.star,
                  { alignSelf: 'flex-end' },
                ]}
                source={favorited === false ? emptyBookmark : Bookmark}
              />
            </TouchableOpacity>
          </View>
          <View style={[style.verticalCardInfo]}>
            <Image
              style={[style.horizontalShape, { resizeMode: 'contain' }]}
              source={imageDict[category]}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[style.verticalCard, { width: Math.floor((3.83 * width) / 9), height: 200, paddingHorizontal: 15 }]}
          onPress={() => navigateToTag(index)}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[style.verticalText]}
            >
              {tagName}
            </Text>
          </View>
          <View style={[style.verticalImageContainer]}>
            <Image
              style={[style.verticalShape, {
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
              }]}
              source={imageDict[tagName]}
            />
          </View>
          <View style={[style.subTopic, { backgroundColor: subTopicColorDict[tagName] }]}>
            <Text style={[style.subTopicText]}>
              subtopics
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

Card.propTypes = {
  navigateToTag: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    tagName: PropTypes.string,
  }).isRequired,
  orientation: PropTypes.string.isRequired,
};
