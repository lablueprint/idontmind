import {
  Text, View, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';

function CheckIn({ navigation }) {
  const numPages = 3.0;

  const beginCheckIn = () => {
    navigation.navigate('Mood', { numPages });
  };

  const continueToDashBoard = () => {
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>welcome back, diya</Text>
      <Image
        source={require('../../assets/shape.png')}
      />
      <View>
        <Pressable onPress={beginCheckIn}>
          <Text>BEGIN CHECK-IN</Text>
        </Pressable>
        <Pressable onPress={continueToDashBoard}>
          <Text>CONTINUE TO DASHBOARD</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default CheckIn;

CheckIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
