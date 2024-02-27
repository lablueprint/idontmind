import {
  Text, View, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { useContext } from 'react';
import starImage from '../../../assets/star.png';
import leftArrow from '../../../assets/left.png';
import rightArrow from '../../../assets/right.png';
import shapeImage from '../../../assets/shape.png';
import cancelImage from '../../../assets/cancel.png';
import goldStar from '../../../assets/goldStar.png';
import style from '../Components/ContentStyle';
import TagContext from '../Context/TagContext';

export default function Tag({ navigation, route }) {
  /* index of corresponding Tag */
  const { index, routeName } = route.params;

  const {
    Tags, deleteFavorite, addFavorite, findFavorite,
  } = useContext(TagContext);

  const tag = Tags[index];

  const {
    _id, tagName, tagBrief,
  } = tag;

  const favorited = findFavorite(_id);

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
    if (findFavorite(_id) === false) {
      favoriteTag();
    } else {
      unfavoriteTag();
    }
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
        flexBasis: 35, flex: 2, flexDirection: 'column',
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
            flex: 2, flexDirection: 'column', borderBottomColor: 'lightgrey', borderBottomWidth: 1,
          }}
        >
          <Text
            style={{ fontSize: 32 }}
          >
            {tagName}
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

      </View>
      <View
        style={{ flex: 2 }}
      >
        <View
          style={{ flex: 1, flexDirection: 'row' }}
        >
          <View
            style={{
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <View>
              <Image
                style={{
                  width: 15, height: 15, marginTop: 7, marginRight: 3, opacity: 0.4,
                }}
                source={leftArrow}
              />
            </View>
          </View>
          <View style={{
            flex: 3, alignItems: 'center', justifyContent: 'center',
          }}
          >
            <Text style={{ opacity: 0.5, fontSize: 22, paddingTop: 8 }}>
              explore.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <View style={{ alignSelf: 'flex-end' }}>
              <Image
                style={{
                  width: 15, height: 15, marginTop: 7, marginRight: 3, opacity: 0.4,
                }}
                source={rightArrow}
              />
            </View>
          </View>
        </View>
        <View
          style={{ flex: 4 }}
        >
          <Swiper
            loop={false}
          >
            {/* eventually want to map the tag's content list */}
            {[].map((key, item) => (
              <View style={{
                flex: 1, padding: 10,
              }}
              >
                <View style={{
                  flex: 3, backgroundColor: 'lightgrey', borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                }}
                >
                  <Text>
                    {item.tagName}
                  </Text>
                </View>
                <View style={{
                  flex: 1,
                }}
                />
              </View>
            ))}
          </Swiper>
        </View>
      </View>
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
