import { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Text, View, TextInput, StyleSheet, Pressable, Image,
} from 'react-native';
import nicole from '../../assets/sleepFace.png'
import styles from './MoodStyle';

function Mood({ navigation }) {

  const continueButton = () => {
    console.log('continue');
    navigation.navigate('Sleep');
  };

  const skipButton = () => {
    console.log('skip');
  };

  const pressMood = () => {
    console.log('mood');
    
  };

  const addMood = () => {
    console.log('addedMood');
    navigation.navigate('AddMood');
  };

  const moodImages = [
    [nicole, nicole, nicole],
    [nicole, nicole, nicole],
    [nicole, nicole, nicole]
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>
          how are you feeling today, really?
        </Text>
      </View>
      <View style={styles.content}>
        {moodImages.map((moodImage) => (
            <View style={styles.moodRow}>
              <View style={styles.singularMood}>
                <Image
                    source={moodImage[0]}
                />
                <Text>NEUTRAL</Text>
              </View>
              <View style={styles.singularMood}>
                <Image
                    source={moodImage[1]}
                />
                <Text>NEUTRAL</Text>
              </View>
              <View style={styles.singularMood}>
                <Image
                    source={moodImage[2]}
                />
                <Text>NEUTRAL</Text>
              </View>
            </View>
        ))}
      </View>
      <View>
        <Pressable onPress={addMood}>
            <Text>+</Text>
        </Pressable>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={continueButton}>
          <Text>CONTINUE</Text>
        </Pressable>
        <Pressable onPress={skipButton}>
          <Text>SKIP</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Mood;
