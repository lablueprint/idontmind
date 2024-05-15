// to be deleted after this round of PR's finish.
import {
  Button, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

export default function PostSignInLanding({ navigation }) {
  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  };

  const navigateToWOYM = () => {
    navigation.navigate('WOYM');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>IDONTMIND</Text>
      <Button
        title="To Journal History"
        onPress={navigateToJournalHistory}
      />
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
