// to be deleted after this round of PR's finish.
import {
  Button, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

export default function PostSignInLanding({ navigation }) {
  const navigateToWOYM = () => {
    navigation.navigate('WOYM');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>IDONTMIND</Text>
      <Button
        title="To WOYM"
        onPress={navigateToWOYM}
      />
    </View>
  );
}

PostSignInLanding.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
