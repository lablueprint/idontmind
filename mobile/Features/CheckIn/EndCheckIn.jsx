import {
  Text, View, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';

function EndCheckIn({ navigation }) {
  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>go away, diya</Text>
      <Image
        source={require('../../assets/shape.png')}
      />
      <View>
        <Pressable onPress={navigateToLanding}>
          <Text>END CHECK-IN</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default EndCheckIn;

EndCheckIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
