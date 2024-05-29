import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';
import home from '../../assets/images/home.png';
import styles from './OverviewStyle';

export default function Overview({ navigation }) {
  const next = () => {
    navigation.navigate('TutorialCheckIn1');
  };
    // Save last visited screen in Secure Storage
  useEffect(() => {
    const saveLastScreen = async () => {
      try {
        await SecureStore.setItemAsync('lastScreen', 'Overview');
      } catch (e) {
        console.error('unable to set screen in storage: ', e);
      }
    };

    saveLastScreen();
  }, []);
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
    }}
    >
      <Text style={styles.title}>Welcome to IDONTMIND!</Text>
      <Text style={styles.subtitle}>
        Our goal here is to get you off the app and into the real world in a more healthy,
        positive, and confident state of mind—on your terms.
      </Text>
      <Image source={home} style={styles.pic} />
      <View>
        <TouchableOpacity style={styles.continue} onPress={next}>
          <Text style={styles.contText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Overview.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
