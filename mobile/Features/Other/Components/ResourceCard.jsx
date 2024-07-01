import {
  Text, View,
  Dimensions, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './ResourceCardStyle';
import book from '../../../assets/images/book.png';

export default function ResourceCard({ resource, navigateToResource }) {
  /* width and height of current mobile screen */
  const { height } = Dimensions.get('window');
  /* card height */
  const cardHeight = Math.floor((2.5 * height) / 9);

  const {
    title, author, content_type, who_answered, question, answer,
  } = resource;

  let authorName = author || who_answered || 'IDONTMIND';
  /* Check if the author name has more than the firstname and lastname */
  if (authorName.split(' ').length > 2 || authorName.length === 0) {
    authorName = 'IDONTMIND';
  }

  let header = title || question;

  if (header.length > 60) {
    header = `${header.substring(0, 60)}...`;
  }

  let content = content_type || answer;

  if (content.length > 110) {
    content = `${content.substring(0, 110)}...`;
  }

  return (
    <View>
      <View
        style={[style.categoryCard, { width: '100%', height: cardHeight }]}
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
            {header}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%',
          }}
          >
            {content}
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
    content_type: PropTypes.string,
    who_answered: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
  navigateToResource: PropTypes.func.isRequired,
};
