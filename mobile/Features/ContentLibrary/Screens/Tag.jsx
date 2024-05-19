import {
  Text, View, Image, ScrollView, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

import shapeImage from '../../../assets/images/shape.png';
import Back from '../../../assets/images/back_button.png';
import style from '../Components/ContentStyle';
import TagContext from '../Context/TagContext';
import TagRectangle from '../Components/TagRectangle';

export default function Tag({ navigation, route }) {
  /* index of corresponding Tag */
  const { index, routeName } = route.params;

  const {
    Tags, deleteFavorite, addFavorite, findFavorite,
  } = useContext(TagContext);

  /* Grabs current tag */
  const tag = Tags[index];

  const {
    id, tagName, tagBrief,
  } = tag;

  /* Checks if current tag is in users favorite list */
  const favorited = findFavorite(_id);

  const navigateToPreviousRoute = () => {
    console.log('hi');
    navigation.navigate('Content Library');
  };

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
  // const handleFavoriteChange = () => {
  //   /* checks if the tag is not not in the user's favorite list */
  //   if (findFavorite(id) === false) {
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
    <ScrollView
      style={[style.container, { paddingHorizontal: 25 }]}
    >
      <View style={[style.row, { paddingTop: 100 }]}>
        <Pressable
          onPress={navigateToPreviousRoute}

        >
          <Image
            style={{
              resizeMode: 'contain', height: 20, width: 20,
            }}
            source={Back}
          />
        </Pressable>
      </View>
      <View style={{
        flex: 1, flexDirection: 'column',
      }}
      >
        <Image
          style={{
            alignSelf: 'center', width: 200, resizeMode: 'contain', height: 200,
          }}
          source={shapeImage}
        />
        <View
          style={{ }}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 40, fontFamily: 'recoleta-regular' }}
          >
            {tagName}
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
            style={{ fontSize: 16, fontFamily: 'cabinet-grotesk-medium', paddingBottom: 10 }}
          >
            Click on a subtopic to see specific resources
          </Text>
        </View>

        <View style={{
          flex: 6, width: '110%',
        }}
        >
          <View style={{ flex: 1 }}>
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
          </View>
        </View>

      </View>
      <View />

    </ScrollView>

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
