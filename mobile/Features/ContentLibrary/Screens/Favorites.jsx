import { useState, useEffect, useContext } from 'react';
import {
  Text, View, FlatList, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from '../Components/ContentStyle';
import shapeImage from '../../../assets/shape.png';
import TagContext from '../Context/TagContext';
import cancelImage from '../../../assets/cancel.png';

export default function FavoritesList({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const {
    Favorites, findTag, Tags,
  } = useContext(TagContext);

  useEffect(() => {
    const foo = async () => {
      try {
        const newFavorites = [];
        Favorites.forEach((id) => {
          const index = findTag(id);
          newFavorites.push(Tags[index]);
        });
        setFavorites(newFavorites);
      } catch (err) {
        console.error(err);
      }
    };
    foo();
  }, [Favorites]);

  const navigateToTag = (_id) => {
    const index = findTag(_id);
    navigation.navigate('Tag', { index, routeName: 'Favorites' });
  };

  const navigateToContentLibrary = () => {
    navigation.navigate('Content Library');
  };

  const verticalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.verticalCard]}
      onPress={() => navigateToTag(item._id)}
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
    <View style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row', height: 38, marginTop: 45,
      }}
      >
        <TouchableOpacity
          onPress={navigateToContentLibrary}
          style={[style.button, {
            flexBasis: 37,
            marginLeft: 15,
            flex: 1,
            backgroundColor: 'transparent',
          }]}
        >
          <Image
            style={{
              marginRight: 3, height: 38, width: 38, alignSelf: 'flex-start',
            }}
            source={cancelImage}
          />
        </TouchableOpacity>
        <Text style={{
          flex: 3, alignSelf: 'center', fontSize: 25,
        }}
        >
          Favorites

        </Text>
      </View>
      <View style={[style.row, { flex: 2, paddingTop: 25 }]}>
        <FlatList
          data={favorites}
          renderItem={verticalRenderItem}
          numColumns={2}
          horizontal={false}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

FavoritesList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
