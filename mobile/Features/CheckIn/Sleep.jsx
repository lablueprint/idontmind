import React, { useState } from 'react';
import {
  Text, View, Pressable, Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { Image } from 'expo-image';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styles from './SleepStyle';

function Sleep({ navigation }) {
  const route = useRoute();
  const numPages = route.params?.numPages;
  const moodValue = route.params?.moodValue;
  const moodsChosen = route.params?.moodsChosen;
  const energyChosen = route.params?.energyChosen;
  const progress = 3 / numPages;

  const { width } = Dimensions.get('window');

  const images = [
    require('../../assets/images/happylilguy.png'),
    require('../../assets/images/smilinglilguy.png'),
    require('../../assets/images/normallilguy.png'),
    require('../../assets/images/sadlilguy.png'),
    require('../../assets/images/crylilguy.png'),
  ];

  const captions = [
    'Excellent',
    'Good',
    'Fair',
    'Poor',
    'Worst',
  ];

  const initialSliderValue = 2;
  const [slider, setSlider] = useState(initialSliderValue);
  const [hasMovedSlider, setHasMovedSlider] = useState(false);
  // const { optionalCheckins } = useSelector((state) => state.auth);
  const optionalCheckins = ['Meal', 'Water', 'Exercise', 'Activity'];

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
    if (!hasMovedSlider) {
      setHasMovedSlider(true);
    }
  };

  const onImagePress = (index) => {
    setSlider(index);
    if (!hasMovedSlider) {
      setHasMovedSlider(true);
    }
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
    const nextPage = getNextPage('Sleep');
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore: 5 - slider,
    };
    if (nextPage) {
      navigation.navigate(nextPage, data);
    } else {
      navigation.navigate('EndCheckIn', data);
    }
  };

  // const skipButton = () => {
  //   const nextPage = getNextPage('Sleep');
  //   const data = {
  //     numPages,
  //     moodValue,
  //     moodsChosen,
  //     energyChosen,
  //     sleepScore: null,
  //   };
  //   if (nextPage) {
  //     navigation.navigate(nextPage, data);
  //   } else {
  //     navigation.navigate('EndCheckIn', data);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.topHeading}>
          How would you rate your sleep quality last night?
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.rating}>
          {captions.map((caption, index) => (
            <View key={index} style={styles.singularRating}>
              <Text style={styles.singularRating2}>{caption}</Text>
            </View>
          ))}
        </View>
        <View style={styles.slider}>
          <View style={{ transform: [{ rotate: '90deg' }] }}>
            <Slider
              style={{ width: 375, height: 40, alignSelf: 'center' }}
              minimumValue={0}
              maximumValue={4}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#374342"
              thumbTintColor="#374342"
              onValueChange={onSliderChange}
              step={1}
              value={slider}
              vertical
            />
          </View>
        </View>
        <View style={styles.faces}>
          {images.map((image, index) => (
            <Pressable key={index} onPress={() => onImagePress(index)} style={styles.faces}>
              <View
                key={index}
                style={[
                  styles.singularFace,
                  { width: 80 + (slider === index ? 20 : 0), height: 70 + (slider === index ? 20 : 0) },
                  slider === index ? styles.shadowEffect : null,
                ]}
              >
                <Image
                  source={image}
                  style={{ width: 30 + (slider === index ? 20 : 0), height: 30 + (slider === index ? 40 : 0), overflow: 'visible' }}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable
          style={[
            styles.continueButton,
            { backgroundColor: hasMovedSlider ? '#374342' : '#C6CECE' },
          ]}
          onPress={continueButton}
          disabled={!hasMovedSlider}
        >
          <Text style={[styles.continueText, { color: hasMovedSlider ? '#FFFFFF' : '#000000' }]}>
            Continue
          </Text>
        </Pressable>
        {/* <Pressable onPress={skipButton}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable> */}
      </View>
    </View>
  );
}

export default Sleep;

Sleep.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
