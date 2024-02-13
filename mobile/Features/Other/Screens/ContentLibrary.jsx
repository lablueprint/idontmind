import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Button,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../Components/SearchBar';

/* Style Sheet */
const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white', 
    borderRadius: 20,
  },
  horizontalCard: {
    padding: 10, marginVertical: 8, marginRight: 16, backgroundColor: 'lightgrey', borderRadius: 10, width: 122, flex: 1,
  },
  star: {
    width: 20, height: 20, opacity: 0.4,
  },
  horizontalCardInfo: {
    flexDirection: 'row', flex: 1, width: 70,
  },
  horizontalText: {
    color: 'black', alignSelf: 'flex-end', marginBottom: 20, flexWrap: 'wrap', flex: 1, fontSize: 16, marginLeft: 5,
  },
  verticalCard: {
    padding: 10, marginVertical: 8, marginRight: 16, backgroundColor: 'lightgrey', borderRadius: 10, flex: 1, flexDirection: 'column',
  },
  shape: {
    width: 95, height: 85, marginRight: 15,
  },
  verticalCardInfo: {
    flex: 1, flexDirection: 'row-reverse',
  },
  verticalText: {
    fontSize: 25,
  },
  whiteBox: {
    backgroundColor: 'white', width: 100, height: 25, borderRadius: 8, marginBottom: 5, marginLeft: 5,
  },
});

/* Fake Data */
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'resource name',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'resource name',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'resource name',
  },
  {
    id: 'bd7acbea-c1b1-42c2-aed5-3ad53abb28ba',
    title: 'resource name',
  },
  {
    id: '3ac68afc-c605-46d3-a4f8-fbd91aa97f63',
    title: 'resource name',
  },
  {
    id: '58694a0f-3da2-471f-bd96-145571e29d72',
    title: 'resource name',
  },
];

export default function ContentLibrary({ navigation }) {
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  const horizontalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.horizontalCard]}
    >
      <Image
        style={[style.star,
          { alignSelf: 'flex-end' },
        ]}
        source={require('../../../assets/star.png')}
      />
      <View
        style={[style.horizontalCardInfo]}
      >
        <Text
          style={[style.horizontalText]}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const verticalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.verticalCard]}
    >
      <Text
        style={[style.verticalText]}
      >
        {item.title}
      </Text>
      <View style={[style.verticalCardInfo]}>
        <Image
          style={[style.shape]}
          source={require('../../../assets/shape.png')}
        />
      </View>
      <View
        style={[style.whiteBox]}
      />
    </TouchableOpacity>
  );

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

  const handleSearch = (query) => {
    // search logic
    if (query.trim() !== '') {
      if (!recentSearches.includes(query.toLowerCase())) {
        setRecentSearches((prevSearches) => [query.toLowerCase(), ...prevSearches]);
      }
    }
  };

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
            onPress={() => navigateToLanding()}
            style={[style.button, {
              flexBasis: 37, justifyContent: 'center', backgroundColor: 'lightgray', width: 110, flexDirection: 'row',
            }]}
          >
            <Image
              style={{
                width: 20, height: 20, marginTop: 7, marginRight: 3, opacity: 0.4,
              }}
              source={require('../../../assets/star.png')}
            />
            <Text style={{
              textAlign: 'center', fontSize: 16, marginTop: 9, marginRight: 2,
            }}
            >
              favorites
            </Text>

          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', marginTop: 5 }}>
          <TouchableOpacity onPress={openSearch}>
            <Image
              style={{ width: 20, height: 31, marginRight: 15 }}
              source={require('../../../assets/search.png')}
            />
            <SearchBar
              visible={isOpen}
              onClose={closeSearch}
              onSearch={handleSearch}
              recentSearches={recentSearches}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToFilter}>
            <Image
              style={{ width: 20, height: 31 }}
              source={require('../../../assets/filter.png')}
            />
          </TouchableOpacity>

        </View>
      </View>
      <View style={[style.row, { flexBasis: 35 }]}>
        <Text style={{ fontSize: 16, flex: 1, color: 'gray' }}>recommended for you</Text>
      </View>
      <View style={[style.row, { flex: 1 }]}>
        <FlatList
          horizontal
          data={DATA}
          renderItem={horizontalRenderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.75, opacity: 0.25 }}
      />
      <View style={[style.row, { flex: 2, paddingTop: 25 }]}>
        <FlatList
          data={DATA}
          renderItem={verticalRenderItem}
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
