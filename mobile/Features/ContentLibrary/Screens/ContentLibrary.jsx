import {
  Text, View, TouchableOpacity, FlatList, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from '../Components/ContentStyle';
import starImage from '../../../assets/images/star.png';
import filterImage from '../../../assets/images/filter.png';
import bookmark from '../../../assets/images/bookmark_fill.png';
import searchImage from '../../../assets/images/search.png';
import Card from '../Components/Card';
import TagContext from '../Context/TagContext';
// do want to change routing though:
import SearchBar from '../../Other/Screens/SearchBar';
import jsonData from '../../../content_library.json';

export default function ContentLibrary({ navigation }) {
  const transformedData = Object.keys(jsonData).map((tagName, index) => ({
    id: index.toString(), // Unique ID for each category
    tagName, // Category name
    subtopics: jsonData[tagName], // Array of sub-items
  }));

  const { initTags, initFavorites } = useContext(TagContext);
  const { id, authHeader } = useSelector((state) => state.auth);

  const navigateToTag = (index, tagName, subtopics) => {
    navigation.navigate('Tag', {
      index, routeName: 'Content', tagName, subtopics,
    });
  };

  const navigateToFavorites = () => {
    navigation.navigate('Bookmarks');
  };

  /* List of Tags */
  const [data, setData] = useState([]);

  useEffect(() => {
    /* Grab all Tags and initalize the Tag List State Variable */
    const getAllTags = async () => {
      try {
        /* Grab all tags */
        const tags = [{ id: '0', tagName: 'hi' }, { id: '1', tagName: 'social anxiety' }, { id: '2', tagName: 'relaxation' }, { id: '3', tagName: 'exercise' }, { id: '4', tagName: 'tag1' }, { id: '5', tagName: 'tag2' }, { id: '6', tagName: 'tag3' }];

        /* Grab user's favorite list */
        const resFavorites = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });

        /* Set Context Set for Favorites */
        initFavorites(resFavorites.data);

        /* Set Context List for Tags */
        initTags(tags);

        /* Set Initial Data for Render Functions */
        setData(tags);
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
      orientation="horizontal"
    />
  );

  /* RenderItem function for Vertical Card Carousel */
  const verticalRenderItem = ({ item, index }) => (
    <Card
      navigateToTag={navigateToTag}
      index={index}
      item={item}
      orientation="vertical"
    />
  );

  // search from main branch; likely to be overwritten by aggregations pr

  const [isOpen, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const navigateToFilter = () => {
    navigation.navigate('Filter');
  };

  const openSearch = () => {
    setOpen(true);
  };
  const closeSearch = () => {
    setOpen(false);
  };

  const handleSearch = (query, type) => {
    // search logic
    if (query.trim() !== '') {
      if (!recentSearches.some((search) => search.query.toLowerCase()
      === query.toLowerCase() && search.type === type)) {
        setRecentSearches((prevSearches) => {
          const updatedSearches = [{ query: query.toLowerCase(), type }, ...prevSearches];
          if (updatedSearches.length > 5) {
            updatedSearches.pop(); // Remove the last element
          }
          return updatedSearches;
        });
      }
      // move an existing search result to the top
      // else {
      //   setRecentSearches((prevSearches) => {
      //     const pos = prevSearches.indexOf(query);
      //     const rotatedPart = prevSearches.slice(0, pos).reverse();
      //     const restPart = prevSearches.slice(pos);
      //     console.log(rotatedPart.concat(restPart));
      //     return rotatedPart.concat(restPart);
      //   });
      // }
    }
  };

  return (
    <View
      style={[style.container, { paddingLeft: 25 }]}
    >
      <SearchBar
        navigation={navigation}
        visible={isOpen}
        onClose={closeSearch}
        onSearch={handleSearch}
        recentSearches={recentSearches}
      />
      <View style={[style.titleRow, { paddingTop: 75, flexBasis: 125, backgroundColor: 'white' }]}>
        <Text style={style.title}>Content</Text>
        <View style={style.row}>
          <View>
            <TouchableOpacity
              onPress={() => navigateToFavorites()}
              style={style.bookmarkBackground}
            >
              <View style={style.bookmarkContainer}>
                <Image
                  source={bookmark}
                  style={style.bookmark}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: 12 }} />
          <View>
            <TouchableOpacity onPress={openSearch} style={style.bookmarkBackground}>
              <View style={style.bookmarkContainer}>
                <Image
                  source={searchImage}
                  style={style.search}
                />
              </View>
              {/* <SearchBar
                navigation={navigation}
                visible={isOpen}
                onClose={closeSearch}
                onSearch={handleSearch}
                recentSearches={recentSearches}
              /> */}
            </TouchableOpacity>
            <SearchBar
              navigation={navigation}
              visible={isOpen}
              onClose={closeSearch}
              onSearch={handleSearch}
              recentSearches={recentSearches}
            />
          </View>
        </View>
      </View>
      <View style={[style.row, { flexBasis: 35 }]}>
        <Text style={style.subheading}>
          Recommended for You
        </Text>
      </View>
      <View style={[style.row, { flex: 1 }]}>
        <FlatList
          horizontal
          data={data}
          renderItem={horizontalRenderItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.75, opacity: 0.25 }}
      />
      <View style={[style.row, { flexBasis: 35 }]}>
        <Text style={style.subheading}>
          All Categories
        </Text>
      </View>
      <View style={[style.row, { flex: 2, paddingTop: 15 }]}>
        <FlatList
          data={transformedData}
          renderItem={verticalRenderItem}
          keyExtractor={(item) => item.id}
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
