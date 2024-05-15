import { View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './Card';

export default function Recommendation({ navigateToTag }) {
  const [recommendedTags, setrecommendedTags] = useState([]);

  const { email } = useSelector((state) => state.auth);

  const horizontalRenderItem = ({ item, index }) => (
    <Card
      navigateToTag={navigateToTag}
      index={index}
      item={item}
      orientation="horizontal"
    />
  );

  useEffect(() => {
    const getRecommendedTags = async () => {
      try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/tag/getRecommendedTags`, { email });
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

Recommendation.propTypes = {
  navigateToTag: PropTypes.func.isRequired,
};
