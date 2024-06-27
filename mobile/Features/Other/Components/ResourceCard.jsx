import {
  Text, View,
  Dimensions, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './ResourceCardStyle';
import book from '../../../assets/images/book.png';

export default function ResourceCard({ resource, navigateToResource }) {
  /* width and height of current mobile screen */
  const { width, height } = Dimensions.get('window');
  /* card width */
  const cardWidth = Math.floor((7 * width) / 9);
  /* card height */
  const cardHeight = Math.floor((2.5 * height) / 9);

  const {
    title, author, excerpts, content_type,
  } = resource;

  let authorName = author;
  /* Check if the author name has more than the firstname and lastname */
  if (author.split(' ').length > 2 || author.length === 0) {
    authorName = 'IDONTMIND';
  }

  let excerpt = '';
  if (excerpts) {
    excerpt = excerpts.excerpt_1;
  }

  return (
    <View>
      <View
        style={[style.categoryCard, { width: cardWidth, height: cardHeight }]}
      >
        <View style={[style.authorContainer]}>
          <View style={[style.bookContainer]}>
            <Image
              style={[style.book,
                { alignSelf: 'flex-end' },
              ]}
              source={book}
            />
          </View>
          <Text style={[style.authorText]}>
            {authorName}
          </Text>
        </View>
        <View style={[style.row, { marginTop: 10, flex: 1 }]}>
          <Text
            style={[style.categoryText]}
          >
            {title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>
            {content_type}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={style.continue} onPress={navigateToResource}>
            <Text style={style.contText}>Read More</Text>
          </TouchableOpacity>
        </View>
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
    content_type: PropTypes.string,
  }).isRequired,
  navigateToResource: PropTypes.func.isRequired,
};
