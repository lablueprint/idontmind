import {
  View, Text, TouchableOpacity, Image,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import waterMore from '../../assets/images/water-more.png';
import waterMiddle from '../../assets/images/water-middle.png';
import waterLess from '../../assets/images/water-less.png';
import styles from './ExerciseStyle';

export default function Exercise({ navigation }) {
  const [water, setWater] = useState('');
  const { optionalCheckins } = useSelector((state) => state.auth);

  const route = useRoute();
  const numPages = route.params?.numPages;
  const moodValue = route.params?.moodValue;
  const moodsChosen = route.params?.moodsChosen;
  const energyChosen = route.params?.energyChosen;
  const sleepScore = route.params?.sleepScore;
  const hasHadMeal = route.params?.hasHadMeal;

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
    const nextPage = getNextPage('Water');
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal,
      water,
    };
    if (nextPage) {
      navigation.navigate(nextPage, data);
    } else {
      navigation.navigate('EndCheckIn', data);
    }
  };

  const skipButton = () => {
    const nextPage = getNextPage('Water');
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal,
      water: null,
    };
    if (nextPage) {
      navigation.navigate(nextPage, data);
    } else {
      navigation.navigate('EndCheckIn', data);
    }
  };

  useEffect(() => {
    console.log(water);
  }, [water]);

  return (
    <ScrollView>
      <View style={{
        display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
      }}
      >
        <Text style={styles.question}>How much water have you had today?</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonCol} onPress={() => setWater('notEnough')}>
            <Image
              source={waterLess}
              style={styles.buttonImg}
            />
            <Text style={styles.buttonText}>Not Enough</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCol} onPress={() => setWater('some')}>
            <Image
              source={waterMiddle}
              style={styles.buttonImg}
            />
            <Text style={styles.buttonText}>Some</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCol} onPress={() => setWater('aLot')}>
            <Image
              source={waterMore}
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
