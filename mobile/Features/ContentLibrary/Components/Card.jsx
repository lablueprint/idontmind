import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from './ContentStyle';
import starImage from '../../../assets/images/star.png';
import goldStar from '../../../assets/images/goldStar.png';
import TagContext from '../Context/TagContext';
import shapeImage from '../../../assets/images/shape.png';

export default function Card({
  navigateToTag, index, item, orientation,
}) {
  const {
    deleteFavorite, addFavorite, findFavorite,
  } = useContext(TagContext);
  const { email, authHeader } = useSelector((state) => state.auth);

  /* Grab item fields */
  const { id, tagName } = item;

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
      ) : (
        <TouchableOpacity
          style={[style.verticalCard]}
          onPress={() => navigateToTag(index)}
        >
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
            <Text
              style={[style.verticalText]}
            >
              {tagName}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end', flex: 1,
              }}
              onPress={() => handleFavoriteChange()}
            >
              <Image
                style={[style.star,
                  { alignSelf: 'flex-end' },
                ]}
                source={favorited === false ? starImage : goldStar}
              />
            </TouchableOpacity>
          </View>
          <View style={[style.verticalCardInfo]}>
            <Image
              style={[style.shape]}
              source={shapeImage}
            />
          </View>
          <View
            style={[style.whiteBox]}
          />
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
