// import { useState, useEffect } from 'react';
import {
  Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import style from '../Components/ContentStyle';
import fakeData from '../Components/ContentFakeData';

export default function Favorites() {
  const horizontalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.horizontalCard]}
    >
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Favorites</Text>
      <View>
        <FlatList
          horizontal
          data={fakeData}
          renderItem={horizontalRenderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

Favorites.propTypes = {
};
