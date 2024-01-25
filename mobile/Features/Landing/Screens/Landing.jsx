import {
  Button, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Landing({ navigation }) {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Landing Page</Text>
      <Button
        title="Get Started"
        onPress={navigateToSignUp}
      />
      <Button
        title="Already have an account?"
        onPress={navigateToLogin}
      />
    </View>
  );
}

Landing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
