import {
  StyleSheet, Text, View, TouchableOpacity, FlatList, Image
} from 'react-native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  carousel: {
    flexDirection: 'row',
    flex: 1,
  },
  button: { // rename to card
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default function CardCarousel({ Data, navigation }) {
  const navigateToDetails = () => {
    navigation.navigate('Details??');
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

  return (
    <View style={[style.carousel]}>
      <FlatList
        horizontal
        data={Data}
        renderItem={renderItem}
      />
    </View>
  );
}

CardCarousel.propTypes = {
  Data: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
