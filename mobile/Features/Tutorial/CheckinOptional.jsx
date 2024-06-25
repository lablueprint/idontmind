import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './OverviewStyle';
import ToggleSwitch from '../Settings/Components/ToggleSwitch';

export default function CheckinOptional({ navigation }) {
  const { id, authHeader } = useSelector((state) => state.auth);
  const allLabels = ['Full Meals', 'Water Intake', 'Physical Activity', 'Intention Setting', 'Looking Forward'];
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
    const checkinArray = Array.from(temp);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { 'pushNotifs.optionalCheckins': checkinArray } }, { headers: authHeader });
  };

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
