import {
  View, FlatList, TouchableOpacity, Image, Text, StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import starShape from '../../../assets/star.png';

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

console.log('Recommendation');

export default function Recommendation() {
  const [recommendedTags, setrecommendedTags] = useState([]);

  const horizontalRenderItem = ({ item }) => (
    <TouchableOpacity
      style={[style.horizontalCard]}
    >
      <Image
        style={[style.star,
          { alignSelf: 'flex-end' },
        ]}
        source={starShape}
      />
      <View
        style={[style.horizontalCardInfo]}
      >
        <Text
          style={[style.horizontalText]}
        >
          {item.tagName}
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const getRecommendedTags = async () => {
      try {
        /* Uncomment when redux is implemented

        */

        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/getRecommendedTags`, { username: 'hi' });
        console.log(res.data);
        setrecommendedTags(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRecommendedTags();
  }, []);
  return (
    <View>
      <FlatList
        horizontal
        data={recommendedTags}
        renderItem={horizontalRenderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
