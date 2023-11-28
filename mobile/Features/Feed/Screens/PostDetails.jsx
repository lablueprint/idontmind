import {
  Button, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Feed({ navigation, post }) {
  const backToFeed = () => {
    navigation.navigate('Feed');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        {post.username}
      </Text>
      <Text>
        {post.body}
      </Text>
      <Button
        title="Back To Feed"
        onPress={backToFeed}
      />
    </View>
  );
}

Feed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  post: PropTypes.shape({
    username: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};
