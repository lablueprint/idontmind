import React, { useState } from 'react';
import {
  Text, View, Pressable, TouchableOpacity, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar';
import { useRoute } from '@react-navigation/native';
import styles from './MealStyles';

export default function Meal(navigation) {
  const route = useRoute();
  const numPages = route.params?.numPages;

  const handleYes = () => {
    navigation.navigate('back', { numPages });
  };

  const handleNo = () => {
    navigation.navigate('back', { numPages });
  };

  const continueButton = () => {
    navigation.navigate('back', { numPages });
  };

  const skipButton = () => {
    navigation.navigate('back', { numPages });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5F8F3', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Have you had a full meal recently?
        </Text>
        <View style={{width: '90%', alignItems: 'center', justifyContent: 'flex-start', marginTop: '6%' }}>
          <Pressable style={styles.yesButton} onPress={handleYes}>
            <Text style={styles.continueText}>Yes, I have!</Text>
          </Pressable>
          <Pressable style={styles.noButton} onPress={handleNo}>
            <Text style={styles.continueText}>No, not yet</Text>
          </Pressable>
        </View>
        <View style={{width: '90%', alignItems: 'center', marginTop: '-35%'}}>
          <Pressable style={styles.continueButton} onPress={continueButton}>
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
