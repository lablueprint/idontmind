import {
  Text, View, Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import styles from './CheckInStyles';

function CheckIn({ navigation }) {
  const numPages = 4.0;

  const beginCheckIn = () => {
    navigation.navigate('Pre Feeling', { numPages });
  };

  const continueToDashBoard = () => {
    console.log('back');
  };

  useEffect(() => {
    const saveLastScreen = async () => {
      try {
        await SecureStore.setItemAsync('lastScreen', 'NavigationBar');
      } catch (e) {
        console.error('cant delete item from storage: ', e);
      }
    };

    saveLastScreen();
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
