import {
  Text, View, TouchableOpacity, Image, ScrollView, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useContext } from 'react';
import starImage from '../../../assets/images/star.png';
import leftArrow from '../../../assets/images/left.png';
import rightArrow from '../../../assets/images/right.png';
import shapeImage from '../../../assets/images/shape.png';
import Back from '../../../assets/images/back_button.png';
import goldStar from '../../../assets/images/goldStar.png';
import style from '../Components/ContentStyle';
import TagContext from '../Context/TagContext';
import styles from './BookmarksStyle';
import TagRectangle from '../Components/TagRectangle';

export default function Tag({ navigation, route }) {
  /* index of corresponding Tag */
  const index = route.params?.index;
  const routeName = route.params?.routeName;

  // const {
  //   Tags, deleteFavorite, addFavorite, findFavorite,
  // } = useContext(TagContext);

  // /* Grabs current tag */
  // const tag = Tags[index];

  // const {
  //   _id, tagName, tagBrief,
  // } = tag;

  const tagNameHardcoded = ' tagName';

  /* Checks if current tag is in users favorite list */
  // const favorited = findFavorite(_id);
  const favorited = true; // hardcode favorited for now

  const hardcodedTags = ['Tag', 'Creativity', 'Energy', 'Environment', 'Exercise', 'Fitness', 'Health', 'Journaling', 'Medication']; // hardcoded for now, i think tag content list

  const navigateToPreviousRoute = () => {
    navigation.navigate(routeName);
  };

  /* Adds Tag to Users Favorites List */
  // const favoriteTag = async () => {
  //   addFavorite(_id);
  //   await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/favoriteTag`, { tag: { id: _id, tagName }, username: 'hi' });
  // };

  /* Remove Tag from Users Favorites List */
  // const unfavoriteTag = async () => {
  //   deleteFavorite(_id);
  //   await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/unfavoriteTag`, { tag: { id: _id, tagName }, username: 'hi' });
  // };

  /* Handles Favorite Change */
  // const handleFavoriteChange = () => {
  //   /* checks if the tag is not not in the user's favorite list */
  //   if (findFavorite(_id) === false) {
  //     favoriteTag();
  //   } else {
  //     unfavoriteTag();
  //   }
  // };

  const navigateToResourceList = (subtopicName) => {
    console.log(subtopicName);
    navigation.navigate('Resource List', { subtopicName });
  };

  return (
    <View
      style={[style.container, { paddingHorizontal: 25 }]}
    >
      <View style={[style.row, { paddingTop: 100, marginBottom: -50 }]}>
        <TouchableOpacity
          onPress={navigateToPreviousRoute}
          style={[style.button, {
            flexBasis: 37,
          }]}
        >
          <Image
            style={{
              resizeMode: 'contain', height: 20, width: 20,
            }}
            source={Back}
          />
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1, flexDirection: 'column',
      }}
      >
        <Image
          style={{
            alignSelf: 'center', flexDirection: 'row', width: 200, flex: 3, resizeMode: 'contain',
          }}
          source={shapeImage}
        />
        <View
          style={{ flex: 4 }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 40, fontFamily: 'recoleta-regular' }}
          >
            {tagNameHardcoded}
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-medium', marginBottom: 20 }}
          >
            Prioritizing lifestyle and wellness practices is beneficial
            for mental health as they promote balance, resilience, and
            positive coping mechanisms, fostering a sense of well-being
            and inner harmony.
          </Text>
          <Text
            style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-medium' }}
          >
            Click on a subtopic to see specific resources
          </Text>
        </View>

        <View style={{
          flex: 6, width: '110%',
        }}
        >
          <ScrollView style={{ flex: 1 }}>
            {
                hardcodedTags.map((item) => (
                  <Pressable key={item} onPress={() => navigateToResourceList(item)}>
                    <TagRectangle
                        // key={resourceName}
                      tagName={item}
                    />
                  </Pressable>
                ))
              }
          </ScrollView>
        </View>

      </View>
      <View />

    </View>

  );
}

Tag.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.number,
      routeName: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
