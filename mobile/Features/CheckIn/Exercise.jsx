import {
  View, Text, TouchableOpacity, Image,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import running from '../../assets/images/running.png';
import walking from '../../assets/images/walking.png';
import standing from '../../assets/images/standing.png';
import styles from './ExerciseStyle';

export default function Exercise({ navigation }) {
  const [exercise, setExercise] = useState('');
  const { optionalCheckins } = useSelector((state) => state.auth);  
  
  const route = useRoute();
  const numPages = route.params?.numPages;
  const moodValue = route.params?.moodValue;
  const moodsChosen = route.params?.moodsChosen;
  const energyChosen = route.params?.energyChosen;
  const sleepScore = route.params?.sleepScore;
  const hasHadMeal = route.params?.hasHadMeal;
  const water = route.params?.water;

  const getNextPage = (currentPage) => {
    const corePages = ['CheckIn', 'PreFeeling', 'Feeling', 'Energy', 'Sleep', 'EndCheckIn'];
    const allPages = corePages.slice(0, corePages.length - 1)
      .concat(optionalCheckins)
      .concat(corePages.slice(corePages.length - 1));

    const currentIndex = allPages.indexOf(currentPage);
    return currentIndex !== -1 && currentIndex < allPages.length - 1
      ? allPages[currentIndex + 1]
      : null;
  };

  const continueButton = () => {
    const nextPage = getNextPage('Exercise');
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal,
      water,
      exercise,
    };
    if (nextPage) {
      navigation.navigate(nextPage, data);
    } else {
      navigation.navigate('EndCheckIn', data);
    }
  };

  const skipButton = () => {
    const nextPage = getNextPage('Exercise');
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal,
      water,
      exercise: null,
    };
    if (nextPage) {
      navigation.navigate(nextPage, data);
    } else {
      navigation.navigate('EndCheckIn', data);
    }
  };

  useEffect(() => {
    console.log(exercise);
  }, [exercise]);

  return (
    <ScrollView>
      <View style={{
        display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
      }}
      >
        <Text style={styles.question}>How much exercise did you get today?</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonCol} onPress={() => setExercise('notMuch')}>
            <Image
              source={standing}
              style={styles.buttonImg}
            />
            <Text style={styles.buttonText}>Not Much</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCol} onPress={() => setExercise('some')}>
            <Image
              source={walking}
              style={styles.buttonImg}
            />
            <Text style={styles.buttonText}>Some</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCol} onPress={() => setExercise('aLot')}>
            <Image
              source={running}
              style={styles.buttonImg}
            />
            <Text style={styles.buttonText}>A Lot</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.continue} onPress={continueButton}>
            <Text style={styles.contText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skip} onPress={skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

Exercise.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
