import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import trophy from '../../assets/images/trophy.png';
import styles from './CompletedChallengesStyle';

function Congratulations({ onReset }) {
  return (
    <View style={styles.congratsContainer}>
      <View style={styles.congratsTop} />
      <View style={styles.circleContainer}>
        <Image source={trophy} style={styles.circleImage} />
      </View>
      <View style={styles.elementContainer}>
        <Text style={styles.congratsText}>Congratulations!</Text>
        <Text style={styles.description}>You’ve worked for 30 days to use technology more mindfully. This isn't just about less screen time — it's about creating more space for what truly matters in life. </Text>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetText}>Reset 30 Day Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Congratulations;

Congratulations.propTypes = {
  onReset: PropTypes.bool.isRequired,
};
