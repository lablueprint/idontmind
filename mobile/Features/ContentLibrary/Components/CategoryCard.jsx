import {
  Text, View, TouchableOpacity, Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './CategoryCardStyle';
import CategoryDict from './CategoryDict';
import jsonData from '../../../content_library.json';

export default function CategoryCard({ categoryName, navigateToTag }) {
  /* width and height of current mobile screen */
  const { width, height } = Dimensions.get('window');
  /* card width */
  const cardWidth = Math.floor((3.83 * width) / 9);
  /* card height */
  const cardHeight = Math.floor((2.1 * height) / 9);
  /* amount of subtopics (tags) */
  const subtopicLength = jsonData[categoryName].length + 1;

  return (
    <View>
      <TouchableOpacity
        style={[style.categoryCard, { width: cardWidth, height: cardHeight }]}
        onPress={() => navigateToTag(index)}
      >
        <View style={[style.row]}>
          <Text
            style={[style.categoryText]}
          >
            {CategoryDict[categoryName].name}
          </Text>
        </View>
        <View style={[style.categoryImageContainer]}>
          <Image
            style={[style.categoryImage]}
            source={CategoryDict[categoryName].image}
          />
        </View>
        <View style={[style.subTopic, { backgroundColor: CategoryDict[categoryName].color }]}>
          <Text style={[style.subTopicText]}>
            {subtopicLength}
            {' '}
            subtopics
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

CategoryCard.propTypes = {
  categoryName: PropTypes.string.isRequired,
  navigateToTag: PropTypes.func.isRequired,
};
