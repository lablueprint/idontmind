import {
  Text, View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './ResourceCardStyle';

export default function ResourceCard({ resource, navigateToResource }) {
  /* width and height of current mobile screen */
  const { width, height } = Dimensions.get('window');
  /* card width */
  const cardWidth = Math.floor((7 * width) / 9);
  /* card height */
  const cardHeight = Math.floor((2.5 * height) / 9);

  const { title, author, excerpts } = resource;

//   const excerpt = excerpts.excerpt_1;

  return (
    <View>
      <View
        style={[style.categoryCard, { width: cardWidth, height: cardHeight }]}
      >
        <View>
          <Text>
            {author}
          </Text>
        </View>
        <View style={[style.row]}>
          <Text
            style={[style.categoryText]}
          >
            {title}
          </Text>
        </View>
        {/* <View>
          <Text>
            {excerpt}
          </Text>
        </View> */}
      </View>
    </View>
  );
}

ResourceCard.propTypes = {
  resource: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    excerpts: PropTypes.shape({
      excerpt_1: PropTypes.string,
    }),
  }).isRequired,
  navigateToResource: PropTypes.func.isRequired,
};
