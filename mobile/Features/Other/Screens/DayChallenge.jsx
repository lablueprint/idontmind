import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

function DayChallenge({ navigation }) {
  const { authHeader } = useSelector((state) => state.auth);
  const [currentDay, setCurrentDay] = useState(0);
  const navigateToContentLibrary = () => {
    navigation.navigate('Content');
  };

  const reset = async () => {
    try {
      const userid = '65b19dd62c6273bd7b9a0c80';
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/resetChallengeDay`, { id: userid }, { headers: authHeader });
      setCurrentDay(0);
    } catch (err) {
      console.error(err);
    }
  };

  const increaseChallengeDay = async () => {
    try {
      const userid = '65b19dd62c6273bd7b9a0c80';
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/increaseChallengeDay`, { id: userid }, { headers: authHeader });
      setCurrentDay(currentDay + 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const foo = async () => {
      try {
        const userid = '65b19dd62c6273bd7b9a0c80';
        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getUserChallengeDay`, { id: userid }, { headers: authHeader });
        setCurrentDay(res.data.ChallengeDay);
      } catch (err) {
        console.error(err);
      }
    };
    foo();
  }, []);
  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 50, flex: 1,
      }}
    >
      <View
        className="title"
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 3,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity color="black" onPress={navigateToContentLibrary} style={{ paddingRight: 5, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 34 }}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 34 }}>30 Day Challenge</Text>
      </View>
      <Text style={{ fontSize: 12, paddingVertical: 20 }}>
        Embark on a 30-day journey to balance your digital life with real-world experiences.
      </Text>
      <View style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightgrey', flex: 8, borderRadius: 15, padding: 30,
      }}
      >
        <Text style={{ fontSize: 22 }}>Your 30 Day Detox </Text>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{
        display: 'flex', flexDirection: 'column', backgroundColor: 'lightgrey', flex: 8, borderRadius: 15, alignItems: 'center', padding: 30,
      }}
      >
        <Text style={{ fontSize: 22 }}>
          Today&apos;s Challenge: Day
          {' '}
          {currentDay}
        </Text>
        <Text style={{ fontSize: 12 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        <View style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center',
        }}
        >
          <TouchableOpacity style={{ flex: 1 }} color="black" onPress={reset}>
            <Text>reset</Text>
          </TouchableOpacity>
          <TouchableOpacity color="black" onPress={increaseChallengeDay}>
            <Text>increase Day</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
}

export default DayChallenge;

DayChallenge.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
