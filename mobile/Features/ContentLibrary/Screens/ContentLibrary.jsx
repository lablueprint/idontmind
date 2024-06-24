import {
  Text, View, TouchableOpacity, FlatList, Image,
  Dimensions,
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
import SearchBar from '../../Other/Components/SearchBar';

export default function ContentLibrary({ navigation }) {
  const { initTags, initFavorites } = useContext(TagContext);
  const { id, authHeader } = useSelector((state) => state.auth);

  const { width } = Dimensions.get('window');

  const navigateToTag = (index) => {
    navigation.navigate('Tag', { index, routeName: 'Content' });
  };

  const navigateToFavorites = () => {
    navigation.navigate('Bookmarks');
  };

  /* List of Tags */
  const [data, setData] = useState([]);

  /* List of Categories */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    /* Grab all Tags and initalize the Tag List State Variable */
    const getAllTags = async () => {
      try {
        /* Grab all tags */
        const tags = [{ id: '0', tagName: 'Boundaries', category: 'Relationships' }, { id: '1', tagName: 'social anxiety', category: 'Emotional Well-Being' }, { id: '2', tagName: 'relaxation', category: 'Identity + Self - Perception' }, { id: '3', tagName: 'exercise', category: 'Mental Health Condition' }, { id: '4', tagName: 'tag1', category: 'Coping' }, { id: '5', tagName: 'tag2', category: 'Support' }, { id: '6', tagName: 'tag3', category: 'Trauma + Recovery' }];

        /* Grab all Categories */
        const categories = [{ id: '0', tagName: 'Coping' }, { id: '1', tagName: 'Emotional Well-Being' }, { id: '2', tagName: 'Identity + Self - Perception' }, { id: '3', tagName: 'Lifestyle + Wellness' }, { id: '4', tagName: 'Mental Health Condition' }, { id: '5', tagName: 'Relationships' }, { id: '6', tagName: 'Self-Improvement + Growth' }, { id: '7', tagName: 'Support' }, { id: '8', tagName: 'Trauma + Recovery' }];

        /* Grab user's favorite list */
        const resFavorites = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getFavorites`, { headers: authHeader, params: { id } });

        /* Set Context Set for Favorites */
        initFavorites(resFavorites.data);

        /* Set Context List for Tags */
        initTags(tags);

        /* Set Initial Data for Render Functions */
        setData(tags);

        /* Set List for Categories */
        setCategories(categories);
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
      style={[style.container]}
    >
      <View style={{ paddingLeft: width / 18 }}>
        <View style={[style.titleRow, { paddingTop: 75, paddingRight: 40, flexBasis: 125 }]}>
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
          data={data}
          renderItem={horizontalRenderItem}
          keyExtractor={(item) => item.id}
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
          keyExtractor={(item) => item.id}
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
