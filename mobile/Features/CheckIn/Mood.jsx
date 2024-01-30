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
  };

  const moodImages = [
    nicole, nicole, nicole
  ];
  
  return (
    <View style={styles.container}>
        {console.log(typeof moodImages[0])}
        <Image
            source={moodImages[0]}
        />
      <View style={styles.heading}>
        <Text>
          how are you feeling today, really?
        </Text>
      </View>
      <View>
        {moodImages.map((moodImage) => (
            <View>
                <Image
                    source={moodImage}
                />
            </View>
        ))}
      </View>
      {/* <View style={styles.content}>
        <View style={styles.moodRow}>
            <Pressable onPress={pressMood}>
                <Image
                    source={nicole}
                />
            </Pressable>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
        </View>
        <View style={styles.moodRow}>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
        </View>
        <View style={styles.moodRow}>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
            <Pressable onPress={pressMood}>
                <Image
                    source={(require('../../assets/sleepFace.png'))}
                />
            </Pressable>
        </View>
      </View> */}
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
