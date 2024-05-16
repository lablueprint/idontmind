import React, { useState } from 'react';
import { Text, View, Pressable, Image, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar';
import { useRoute } from '@react-navigation/native';
import styles from './SleepStyle';

function Sleep({ navigation }) {
  const route = useRoute();
  const numPages = route.params?.numPages;
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

  const [slider, setSlider] = useState(0);

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };

  const continueButton = () => {
    if (slider !== 0) {
      navigation.navigate('Meal', {
        sleepScore: slider,
      });
    }
  };

  const skipButton = () => {
    navigation.navigate('Meal');
  };

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
            <View style={styles.singularRating}>
              <Text key={index} style={styles.singularRating2}>{caption}</Text>
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
              vertical
            />
          </View>
        </View>
        <View style={styles.faces}>
          {images.map((image, index) => (
            <View key={index} style={[
              styles.singularFace,
              { width: 80 + (slider === index ? 20 : 0), height: 70 + (slider === index ? 20 : 0) },
              slider === index ? styles.shadowEffect : null,
            ]}>
              <Image
                source={image}
                style={{ width: 30 + (slider === index ? 20 : 0), height: 30 + (slider === index ? 40 : 0), overflow: 'visible', }}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.continueButton} onPress={continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
        <Pressable onPress={skipButton}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
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
