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
import cancelImage from '../../../assets/images/cancel.png';
import goldStar from '../../../assets/images/goldStar.png';
import style from '../Components/ContentStyle';
import TagContext from '../Context/TagContext';
import styles from './BookmarksStyle';

export default function Tag({ navigation, route }) {
  /* index of corresponding Tag */
  const { index, routeName } = route.params;

  const {
    Tags, deleteFavorite, addFavorite, findFavorite,
  } = useContext(TagContext);

  /* Grabs current tag */
  const tag = Tags[index];

  const {
    _id, tagName, tagBrief,
  } = tag;

  /* Checks if current tag is in users favorite list */
  const favorited = findFavorite(_id);

  const subtopics = ['Tag', 'Creativity', 'Energy', 'Environment', 'Exercise', 'Fitness', 'Health', 'Journaling', 'Medication']; // hardcoded for now, i think tag content list

  const navigateToPreviousRoute = () => {
    navigation.navigate(routeName);
  };

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

  const navigateToResourceList = (subtopicName) => {
    console.log(subtopicName);
    navigation.navigate('Resource List', { subtopicName });
  };

  return (
    <View
      style={[style.container, { paddingHorizontal: 25 }]}
    >
      <View style={[style.row, { paddingTop: 65 }]}>
        <View style={{
          flex: 1, flexDirection: 'row', height: 38,
        }}
        >
          <TouchableOpacity
            onPress={navigateToPreviousRoute}
            style={[style.button, {
              flexBasis: 37,
            }]}
          >
            <Image
              style={{
                marginRight: 3, height: 38, width: 38,
              }}
              source={cancelImage}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 4 }}
          />
          <TouchableOpacity
            onPress={() => handleFavoriteChange()}
            style={[style.button, {
              flexBasis: 37, justifyContent: 'center', backgroundColor: 'lightgray', width: 110, flexDirection: 'row', flex: 1,
            }]}
          >
            <Image
              style={{
                width: 20, height: 20, marginTop: 7, marginRight: 3, opacity: 0.4,
              }}
              source={favorited ? goldStar : starImage}
            />
            <Text style={{
              textAlign: 'center', fontSize: 16, marginTop: 9, marginRight: 2,
            }}
            >
              {favorited ? 'unadd' : 'add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[style.row, {
        flexBasis: 35, flex: 4, flexDirection: 'column',
      }]}
      >
        <Image
          style={{
            alignSelf: 'center', flexDirection: 'row', width: 200, flex: 3, resizeMode: 'contain',
          }}
          source={shapeImage}
        />
        <View
          style={{ height: 15 }}
        />
        <View
          style={{
            flex: 3, flexDirection: 'column', borderBottomColor: 'lightgrey', borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ fontSize: 32 }}
          >
            {tagName}
          </Text>
          <Text
            style={{ fontSize: 12 }}
          >
            Prioritizing lifestyle and wellness practices is beneficial
            for mental health as they promote balance, resilience, and
            positive coping mechanisms, fostering a sense of well-being
            and inner harmony.
          </Text>
          <Text
            style={{ fontSize: 12 }}
          >
            Click on a subtopic to see specific resources
          </Text>
          <ScrollView
            style={{ flex: 1 }}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                flex: 5, fontSize: 15, opacity: 0.75, marginTop: 5,
              }}
            >
              {tagBrief}
            </Text>
            <View
              style={{ flex: 1 }}
            />
          </ScrollView>
        </View>

        <View style={styles.pills}>
          {subtopics.map((item) => (
            <View
              key={item}
              style={styles.pill}
            >
              <Pressable onPress={() => navigateToResourceList(item)}>
                <Text>{item}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
      <View />
      <View
        style={{ flex: 2 }}
      />
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
