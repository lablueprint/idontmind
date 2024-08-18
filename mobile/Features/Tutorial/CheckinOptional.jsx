import { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { setOptionalCheckins } from '../../redux/authSlice';
import styles from './OverviewStyle';
import ToggleSwitch from '../Other/Components/ToggleSwitch';

export default function CheckinOptional({ navigation }) {
  const { id, authHeader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const allLabels = ['Full Meals', 'Water Intake', 'Physical Activity', 'Intention Setting'];
  const labelValues = {
    'Full Meals': 'Meal', 'Water Intake': 'Water', 'Physical Activity': 'Exercise', 'Intention Setting': 'Activity',
  };
  const [checkinSet, setCheckinSet] = useState(new Set());

  const next = () => {
    navigation.navigate('TutorialCheckIn2');
  };

  const toggleSwitch = async (label) => {
    const temp = new Set(checkinSet);
    if (checkinSet.has(label)) {
      temp.delete(label);
      setCheckinSet(temp);
    } else {
      temp.add(label);
      setCheckinSet(temp);
    }
    const checkinArray = Array.from(temp, (value) => labelValues[value]);
    console.log(checkinArray);
    console.log(id);
    try {
      console.log('update');
      dispatch(setOptionalCheckins({ optionalCheckins: checkinArray }));
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { optionalCheckins: checkinArray } }, { headers: authHeader });
    } catch (e) {
      console.log(e);
    }
  };

  // Save last visited screen in Secure Storage
  useEffect(() => {
    const saveLastScreen = async () => {
      try {
        await SecureStore.setItemAsync('lastScreen', 'CheckinOptional');
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
      <Text style={styles.title}>Just checking in</Text>
      <Text style={styles.subtitle}>
        We&apos;ll always check in on your mood, sleep, and energy levels, but these questions are optional. You can always change this later.
      </Text>
      <View style={styles.allToggleContainers}>
        {allLabels.map((label) => (
          <ToggleSwitch label={label} value={checkinSet.has(label)} onValueChange={toggleSwitch} />
        ))}
      </View>
      <View>
        <TouchableOpacity style={styles.continue} onPress={next}>
          <Text style={styles.contText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

CheckinOptional.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
