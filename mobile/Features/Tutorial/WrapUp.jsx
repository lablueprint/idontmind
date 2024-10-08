import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import reward from '../../assets/images/reward.png';
import styles from './OverviewStyle';

export default function WrapUp({ navigation }) {
  const next = () => {
    navigation.navigate('CheckIn');
  };
  useEffect(() => {
    const saveLastScreen = async () => {
      try {
        await SecureStore.setItemAsync('lastScreen', 'TutorialCheckIn2');
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
      <Text style={styles.title}>Ready to go?</Text>
      <Text style={styles.subtitle}>
        Complete your first check-in to start your IDONTMIND journey!
      </Text>
      <Image source={reward} style={styles.pic} />
      <View>
        <TouchableOpacity style={styles.continue} onPress={next}>
          <Text style={styles.contText}>Let&apos;s Roll!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

WrapUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
