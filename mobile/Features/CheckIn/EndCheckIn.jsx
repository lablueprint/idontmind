import {
  Text, View, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

function EndCheckIn({ navigation }) {
  const route = useRoute();
  const { email, id, authHeader } = useSelector((state) => state.auth);
  const [submitted, setSubmitted] = useState(false); // state to manage submission status

  useEffect(() => {
    const submitData = async () => {
      const data = {
        metadata: {
          email,
          userId: id,
        },
        timestamp: new Date(),
        numPages: route.params.numPages,
        moodValue: route.params.moodValue,
        moodsChosen: route.params.moodsChosen,
        energyChosen: route.params.energyChosen,
        sleepScore: route.params.sleepScore,
        hasHadMeal: route.params.hasHadMeal || null,
        water: route.params.water || null,
        exercise: route.params.exercise || null,
        activityChosen: route.params.activityChosen || null,
      };

      try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/insertTimeSeries`, data, { headers: authHeader });
        console.log('Response:', res); // log the response
        if (res.status === 201) {
          console.log('Check-in data submitted successfully');
          setSubmitted(true); // set submitted to true on successful submission
        } else {
          console.error('Failed to save data:', res.statusText);
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
        if (err.response) {
          console.error('Error response data:', err.response.data);
        } else if (err.request) {
          console.error('Error request:', err.request);
        } else {
          console.error('Error message:', err.message);
        }
      }
    };

    if (!submitted) {
      submitData();
    }
  }, [submitted, email, id, authHeader, route.params])
  const handleEnd = () => {
    navigation.navigate('AltNavigationBar');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Congrats! You’ve completed today’s check in!</Text>
      <Image
        source={require('../../assets/images/shape.png')}
      />
      <View>
        <Pressable onPress={handleEnd}>
          <Text>Continue to Dashboard</Text>
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
