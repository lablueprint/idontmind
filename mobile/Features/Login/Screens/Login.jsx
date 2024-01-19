import {
  Button, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Login({ navigation }) {
  const navigateToFeed = () => {
    navigation.navigate('Feed');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Page</Text>
      <TextInput placeholder="Enter username" />
      <Button
        title="Enter"
      />
      <Button
        title="To Feed"
        onPress={navigateToFeed}
      />
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
