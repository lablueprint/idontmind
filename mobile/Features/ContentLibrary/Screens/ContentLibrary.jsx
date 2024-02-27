import {
  Text, View, TouchableOpacity, FlatList, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import style from '../Components/ContentStyle';
import starImage from '../../../assets/star.png';
import filterImage from '../../../assets/filter.png';
import searchImage from '../../../assets/search.png';
import shapeImage from '../../../assets/shape.png';
import Card from '../Components/Card';

import TagContext from '../Context/TagContext';

export default function ContentLibrary({ navigation }) {
  const { initTags, initFavorites } = useContext(TagContext);

  const navigateToTag = (index) => {
    navigation.navigate('Tag', { index, routeName: 'Content Library' });
  };

  const navigateToFavorites = () => {
    navigation.navigate('Favorites');
  };

  /* List of Tags */
  const [data, setData] = useState([]);

  useEffect(() => {
    /* Grab all Tags and initalize the Tag List State Variable */
    const getAllTags = async () => {
      try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/getAllTagTitles`);

        const resFavorites = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { username: 'hi' });

        /* Set Context Set for Favorites */
        initFavorites(resFavorites.data);

        /* Set Context List for Tags */
        initTags(res.data);

        /* Set Initial Data for Render Functions */
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllTags();
  }, []);

  /* RenderItem function for Horizontal Card Carousel */
  const horizontalRenderItem = ({ item, index }) => (
    <Card
      navigateToTag={navigateToTag}
      index={index}
      item={item}
    />
  );

  /* RenderItem function for Vertical Card Carousel */
  const verticalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.verticalCard]}
      onPress={() => navigateToTag(item.tagName)}
    >
      <Text
        style={[style.verticalText]}
      >
        {item.tagName}
      </Text>
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
  );

  return (
    <View
      style={[style.container, { paddingLeft: 25 }]}
    >
      <View style={[style.row, { paddingTop: 75, flexBasis: 125, backgroundColor: 'white' }]}>
        <Text style={{ fontSize: 30, flex: 3, paddingLeft: 5 }}>content</Text>
        <View
          style={[style.container, { flex: 3 }]}
        >
          <TouchableOpacity
            onPress={() => navigateToFavorites()}
            style={[style.button, {
              flexBasis: 37, justifyContent: 'center', backgroundColor: 'lightgray', width: 110, flexDirection: 'row',
            }]}
          >
            <Image
              style={{
                width: 20, height: 20, marginTop: 7, marginRight: 3, opacity: 0.4,
              }}
              source={starImage}
            />
            <Text
              style={{
                textAlign: 'center', fontSize: 16, marginTop: 9, marginRight: 2,
              }}
            >
              favorites
            </Text>

          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', marginTop: 5 }}>
          <Image
            style={{ width: 20, height: 31, marginRight: 15 }}
            source={searchImage}
          />
          <Image
            style={{ width: 20, height: 31 }}
            source={filterImage}
          />
        </View>
      </View>
      <View style={[style.row, { flexBasis: 35 }]}>
        <Text style={{ fontSize: 16, flex: 1, color: 'gray' }}>
          recommended for you
        </Text>
      </View>
      <View style={[style.row, { flex: 1 }]}>
        <FlatList
          horizontal
          data={data}
          renderItem={horizontalRenderItem}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.75, opacity: 0.25 }}
      />
      <View style={[style.row, { flex: 2, paddingTop: 25 }]}>
        <FlatList
          data={data}
          renderItem={verticalRenderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

ContentLibrary.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
