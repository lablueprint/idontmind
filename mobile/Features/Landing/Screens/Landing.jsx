import {
  Button, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Landing({ navigation }) {
  const navigateToFeed = () => {
    navigation.navigate('Feed');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToContentLibrary = () => {
    navigation.navigate('Content Library');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Landing Page</Text>
      <Button
        title="To Feed"
        onPress={navigateToFeed}
      />
      <Button
        title="To Login"
        onPress={navigateToLogin}
      />
      <Button
        title="To Content Library"
        onPress={navigateToContentLibrary}
      />
    </View>
  );
}

Landing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
