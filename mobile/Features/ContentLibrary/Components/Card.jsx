import {
    StyleSheet, Text, View, TouchableOpacity, Image
} from 'react-native';
import PropTypes from 'prop-types';
import style from './ContentStyle';
import starImage from '../../../assets/star.png';
import goldStar from '../../../assets/goldStar.png';
import { useContext } from 'react';
import TagContext from '../Context/TagContext';
import axios from 'axios';

   export default function Card({
    navigateToTag, index
}) {

    const { updateTag, Tags, Favorites, deleteFavorite, addFavorite, findFavorite } = useContext(TagContext);

    const tag = Tags[index];

    const { _id, tagName, isFavorite } = tag;

    // const favorited = findFavorite(tag);

    /* Adds Tag to Users Favorites List */  
    const favoriteTag = async () => {
      // addFavorite(tag);
      // console.log("favorite");
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/favoriteTag`, { tag: { id: _id, tagName: tagName }, username: 'hi' });    
    }
    
    /* Remove Tag from Users Favorites List */
    const unfavoriteTag = async () => {
      // deleteFavorite(tag);
      // console.log("unfavorite");
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/unfavoriteTag`, { tag: { id: _id, tagName: tagName }, username: 'hi' });
    };
  
    /* Handles Favorite Change */
    const handleFavoriteChange = () => {

      /* Updates old tag with new favorite */
      const newTag = {
        ...tag,
        isFavorite: !isFavorite,
      }
  
      /* Updates tag list state variable */
      updateTag(index, newTag);

      /* Updates Users favorite list in Database */
      if (newTag.isFavorite == true) {
        favoriteTag();
      } else {
        unfavoriteTag();    
      }

      // if (findFavorite(tag) == false) {
      //   favoriteTag();
      // } else {
      //   unfavoriteTag();
      // }
    }

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
            source={isFavorite === false ? starImage : goldStar}
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
};

Card.propTypes = {
    navigateToTag: PropTypes.func,
    index: PropTypes.number,
}
