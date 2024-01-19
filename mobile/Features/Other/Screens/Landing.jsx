// to be deleted after this round of PR's finish.
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

  const navigateToJournal = () => {
    navigation.navigate('Journal');
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
        title="To Journal"
        onPress={navigateToJournal}
      />
    </View>
  );
}

Landing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
