import React, { useState } from 'react';
import {
  Text, View, Pressable, Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './MealStyles';

export default function Meal({ navigation }) {
  const route = useRoute();
  const numPages = route.params?.numPages;
  const moodValue = route.params?.moodValue;
  const moodsChosen = route.params?.moodsChosen;
  const energyChosen = route.params?.energyChosen;
  const sleepScore = route.params?.sleepScore;
  const { optionalCheckins } = useSelector((state) => state.auth);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

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
    const hasHadMeal = (selectedOption === 'yes');
    const nextPage = getNextPage('Meal');
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal,
    };
    if (nextPage) {
      navigation.navigate(nextPage, data);
    } else {
      navigation.navigate('EndCheckIn', data);
    }
  };

  const skipButton = () => {
    const nextPage = getNextPage('Meal');
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal: null,
    };
    if (nextPage) {
      navigation.navigate(nextPage, data);
    } else {
      navigation.navigate('EndCheckIn', data);
    }
  };

  return (
    <View style={{
      flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5F8F3', height: '100%',
    }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>
          Have you had a full meal recently?
        </Text>
        <View style={{
          width: '90%', alignItems: 'center', justifyContent: 'flex-start', marginTop: '6%',
        }}
        >
          <Pressable
            style={[
              styles.yesButton,
              selectedOption === 'yes' ? styles.selectedButton : styles.deselectedButton,
            ]}
            onPress={() => handleSelect('yes')}
          >
            <Text style={styles.continueText}>Yes, I have!</Text>
          </Pressable>
          <Pressable
            style={[
              styles.noButton,
              selectedOption === 'no' ? styles.selectedButton : styles.deselectedButton,
            ]}
            onPress={() => handleSelect('no')}
          >
            <Text style={styles.continueText}>No, not yet</Text>
          </Pressable>
        </View>
        <View style={{ width: '90%', alignItems: 'center', marginTop: '-35%' }}>
          <Pressable
            style={[
              styles.continueButton,
              !selectedOption && styles.continueButtonDisabled,
            ]}
            onPress={continueButton}
            disabled={!selectedOption}
          >
            <Text style={styles.continueText}>Continue</Text>
          </Pressable>
          <Pressable onPress={skipButton}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

Meal.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
