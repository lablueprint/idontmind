import {
  Text, View, Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import styles from './CheckInStyles';

function CheckIn({ navigation }) {
  const numPages = 4.0;

  const { email, authHeader } = useSelector((state) => state.auth);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const beginCheckIn = () => {
    if (hasCheckedIn) {
      alert('You have already completed your check-in for today.');
    } else {
      navigation.navigate('Pre Feeling', { numPages });
    }
  };

  const continueToDashBoard = () => {
    navigation.navigate('Landing');
  };

  const checkExistingCheckIn = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/checkExistingCheckIn`, {
        headers: authHeader,
        params: { email },
      });
      if (response.data.exists) {
        setHasCheckedIn(true);
      }
    } catch (err) {
      console.error('Failed to check existing check-in:', err);
      alert('Failed to verify existing check-in. Please try again later.');
    }
  };

  // this prevents multiple checkins in a day under the same user
  useEffect(() => {
    checkExistingCheckIn();
  }, []);

  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5F8F3',
    }}
    >
      <View style={[styles.checkInContentContainer, { marginBottom: '40%' }]}>
        <Text style={styles.welcomeText}>Hi Daniel!</Text>
        <Text style={styles.welcomeText}>What is your</Text>
        <Text style={styles.welcomeText}>mood like today?</Text>
        <View style={styles.highlight} />
        <View style={[styles.checkInButtonsContainer, { marginTop: '10%' }]}>
          <Pressable style={styles.beginCheckInButton} onPress={beginCheckIn}>
            <Text style={styles.beginCheckInText}>Begin Check-In</Text>
          </Pressable>
          <Pressable style={styles.continueToDashboardButton} onPress={continueToDashBoard}>
            <Text style={styles.continueToDashboardText}>Continue To Dashboard</Text>
          </Pressable>
        </View>
      </View>
      <Image
        source={require('../../assets/images/lilGuy.png')}
        style={styles.checkInMascot}
      />
    </View>
  );
}

export default CheckIn;

CheckIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
