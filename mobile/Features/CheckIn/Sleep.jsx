import { useState } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import ProgressBar from 'react-native-progress/Bar';
import styles from './SleepStyle';

function Sleep() {
  const route = useRoute();
  // update progress
  const numPages = route.params?.numPages;
  const progress = 2 / numPages;
  // slider state
  const [slider, setSlider] = useState(0);

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };

  const continueButton = () => {
    // console.log('continue');
  };

  const skipButton = () => {
    // console.log('skip');
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} width={200} style={{ top: '5%' }} />
      <View style={styles.heading}>
        <Text>
          rate your sleep quality last night.
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.rating}>
          <Text style={styles.singularRating}>10 excellent</Text>
          <Text style={styles.singularRating}>9</Text>
          <Text style={styles.singularRating}>8</Text>
          <Text style={styles.singularRating}>7</Text>
          <Text style={styles.singularRating}>6</Text>
          <Text style={styles.singularRating}>5 average</Text>
          <Text style={styles.singularRating}>4</Text>
          <Text style={styles.singularRating}>3</Text>
          <Text style={styles.singularRating}>2</Text>
          <Text style={styles.singularRating}>1 very poor</Text>
        </View>
        <View style={styles.slider}>
          <View style={{ transform: [{ rotate: '-90deg' }] }}>
            <Slider
              style={{ width: 600, height: 40, alignSelf: 'center' }}
              minimumValue={1}
              maximumValue={12}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onValueChange={onSliderChange}
              step={1}
              vertical
              lowerLimit={2}
              upperLimit={11}
            />
          </View>
        </View>
        <View style={styles.faces}>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/sleepFace.png')}
            />
          </View>
        </View>
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

export default Sleep;
