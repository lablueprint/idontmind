import { useState, useEffect } from 'react';
import {
  Text, View, FlatList, TouchableOpacity, Image,
} from 'react-native';
import axios from 'axios';
import style from '../Components/ContentStyle';
import shapeImage from '../../../assets/shape.png';

export default function Favorites() {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const foo = async () => {
      try {
        const res = await axios.post('http://localhost:4000/offUser/getFavorites', { username: 'hi' });
        setFavorites(res.data);
      } catch (err) {
        console.err(err);
      }
    };
    foo();
  }, []);

  const verticalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.verticalCard]}
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Favorites</Text>
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

Favorites.propTypes = {
};
