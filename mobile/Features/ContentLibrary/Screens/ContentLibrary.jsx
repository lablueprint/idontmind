import {
  Text, View, TouchableOpacity, FlatList, Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import style from '../Components/ContentStyle';
import bookmark from '../../../assets/images/bookmark_fill.png';
import searchImage from '../../../assets/images/search.png';
import TagContext from '../Context/TagContext';
// do want to change routing though:
import SearchBar from '../../Other/Components/SearchBar';
import jsonData from '../../../content_library.json';
import CategoryCard from '../Components/CategoryCard';
import RecommendationCard from '../Components/RecommendationCard';

export default function ContentLibrary({ navigation }) {
  const { initTags, initFavorites } = useContext(TagContext);
  const { id, authHeader } = useSelector((state) => state.auth);

  /* width of screen */
  const { width } = Dimensions.get('window');

  const navigateToTag = (categoryName) => {
    navigation.navigate('Tag', { routeName: 'Content', categoryName });
  };

  const navigateToResourceList = (subtopicName) => {
    navigation.navigate('Resource List', { subtopicName, routeName: 'Content Library' });
  };

  const navigateToFavorites = () => {
    navigation.navigate('Bookmarks');
  };

  /* List of Tags */
  const [tags, setTags] = useState([]);

  /* List of Categories */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    /* Grab all Tags and initalize the Tag List State Variable */

    const getAllTagsAndCategories = async () => {
      try {
        /* Grab all tags */
        const resTags = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getRecommendedTags`, { id }, { headers: authHeader });
        const recommendedTags = resTags.data;

        /* Grab all Categories */
        const allCategories = Object.keys(jsonData);

        /* Grab user's favorite list */
        const resFavorites = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });

        /* Set Context Set for Favorites */
        initFavorites(resFavorites.data);

        /* Set Context List for Tags */
        initTags(tags);

        /* Set List of tags */
        setTags(recommendedTags);

        /* Set List for Categories */
        setCategories(allCategories);
      } catch (err) {
        console.error(err);
      }
    };
    getAllTagsAndCategories();
  }, []);

  /* RenderItem function for Horizontal Card Carousel */
  const horizontalRenderItem = ({ item }) => (
    <RecommendationCard
      navigateToResourceList={navigateToResourceList}
      tagName={item}
    />
  );

  /* RenderItem function for Vertical Card Carousel */
  const verticalRenderItem = ({ item }) => (
    <CategoryCard
      categoryName={item}
      navigateToTag={navigateToTag}
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
      style={[style.container]}
    >
      <View style={{ paddingLeft: width / 18 }}>
        <View style={[style.titleRow]}>
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
                <SearchBar
                  visible={isOpen}
                  onClose={closeSearch}
                  onSearch={handleSearch}
                  recentSearches={recentSearches}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[style.row]}>
          <Text style={style.subheading}>
            Recommended for You
          </Text>
        </View>
      </View>
      <View style={[style.row, { flex: 1 }]}>
        <FlatList
          horizontal
          data={tags}
          renderItem={horizontalRenderItem}
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: width / 18 }}
        />
      </View>
      <View style={[style.row, { flexBasis: 35, paddingLeft: width / 18 }]}>
        <Text style={style.subheading}>
          All Categories
        </Text>
      </View>

      <View style={[style.row, { flex: 2 }]}>
        <FlatList
          data={categories}
          renderItem={verticalRenderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          style={{ paddingLeft: width / 18 }}
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
