import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import styles from './ThirtyDayChallengeStyle';
import Challenge from './Challenge';
import Congratulations from './CompletedChallenges';
import challengeData from './30DayChallengeData';

export default function ThirtyDayChallenge() {
  const [startDate, setStartDate] = useState(null);
  const [unfoldedChallenges, setUnfoldedChallenges] = useState(Array(30).fill(false));
  const [completionDates, setCompletionDates] = useState(Array(30).fill(null));
  const [completedChallenges, setCompletedChallenges] = useState(Array(30).fill(false));

  useEffect(() => {
    const fetchStartDate = async () => {
      const storedStartDate = await AsyncStorage.getItem('startDate');
      if (storedStartDate) {
        setStartDate(new Date(storedStartDate));
      } else {
        const newStartDate = new Date();
        setStartDate(newStartDate);
        await AsyncStorage.setItem('startDate', newStartDate.toISOString());
      }
    };

    const fetchCompletionData = async () => {
      const storedCompletionDates = await AsyncStorage.getItem('completionDates');
      const storedCompletedChallenges = await AsyncStorage.getItem('completedChallenges');

      if (storedCompletionDates) {
        setCompletionDates(JSON.parse(storedCompletionDates));
      }
      if (storedCompletedChallenges) {
        setCompletedChallenges(JSON.parse(storedCompletedChallenges));
      }
    };

    fetchStartDate();
    fetchCompletionData();
  }, []);

  if (!startDate) {
    return null;
  }

  const today = new Date();
  const currentDay = Math.min(Math.floor((today - startDate) / (1000 * 60 * 60 * 24)), 29);

  const handleToggle = (index) => {
    const newUnfoldedChallenges = unfoldedChallenges.map((unfolded, i) =>
      i === index ? !unfolded : unfolded
    );
    setUnfoldedChallenges(newUnfoldedChallenges);
  };

  const handleComplete = async (index) => {
    const newCompletionDates = [...completionDates];
    const newCompletedChallenges = [...completedChallenges];
    newCompletionDates[index] = new Date().toLocaleDateString();
    newCompletedChallenges[index] = true;
    setCompletionDates(newCompletionDates);
    setCompletedChallenges(newCompletedChallenges);
    await AsyncStorage.setItem('completionDates', JSON.stringify(newCompletionDates));
    await AsyncStorage.setItem('completedChallenges', JSON.stringify(newCompletedChallenges));
  };

  const handleReset = async () => {
    const resetCompletionDates = Array(30).fill(null);
    const resetCompletedChallenges = Array(30).fill(false);
    setCompletionDates(resetCompletionDates);
    setCompletedChallenges(resetCompletedChallenges);
    await AsyncStorage.setItem('completionDates', JSON.stringify(resetCompletionDates));
    await AsyncStorage.setItem('completedChallenges', JSON.stringify(resetCompletedChallenges));
    const newStartDate = new Date();
    setStartDate(newStartDate);
    await AsyncStorage.setItem('startDate', newStartDate.toISOString());
  };

  const allChallengesCompleted = completedChallenges.every((completed) => completed);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E0F1F3' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>30 Day Challenge</Text>
        <Text style={styles.description}>
          Embark on a 30-day journey to balance your digital life with real-world experiences.
        </Text>
        {allChallengesCompleted && <Congratulations onReset={handleReset} />}
        {challengeData.slice(0, currentDay + 1).reverse().map((challenge, index) => (
          <Challenge
            key={index}
            day={`Day ${index + 1}`}
            description={challenge.description}
            isUnfolded={index === currentDay || unfoldedChallenges[index]}
            onToggle={() => handleToggle(index)}
            onComplete={() => handleComplete(index)}
            isCompleted={completedChallenges[index]}
            completionDate={completionDates[index]}
            title={challenge.title}
          />
        )).slice(0, currentDay + 1)
          .reverse()}
      </ScrollView>
    </View>
  );
}
