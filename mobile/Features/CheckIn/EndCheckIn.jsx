import {
  Text, View, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

function EndCheckIn({ navigation }) {
  const route = useRoute();
  const moodsChosen = route.params?.moodsChosen;
  const activityChosen = route.params?.activityChosen;
  const sleepScore = route.params?.sleepScore;
  const handleEnd = async () => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/checkins/createCheckIn`, {
      moodsText: moodsChosen, activityText: activityChosen, sleep: sleepScore,
    });
    if (res.data.error) {
      console.error(res.data.error);
    } else {
      navigation.navigate('Landing');
    }
  };

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
        <Pressable onPress={handleEnd}>
          <Text>END CHECK-IN</Text>
        </Pressable>
        <Pressable onPress={navigateToLanding}>
          <Text>CONTINUE TO LANDING</Text>
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
