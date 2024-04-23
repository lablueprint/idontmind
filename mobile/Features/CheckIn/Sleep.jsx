import { useState } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import ProgressBar from 'react-native-progress/Bar';
import PropTypes from 'prop-types';
import styles from './SleepStyle';

function Sleep({ navigation }) {
  const route = useRoute();
  const moodsChosen = route.params?.moodsChosen;
  const moodValueChosen = route.params?.moodValueChosen;
  const activityChosen = route.params?.activityChosen;
  // update progress
  const numPages = route.params?.numPages;
  const progress = 3 / numPages;
  // slider state
  const [slider, setSlider] = useState(0);

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };

  const continueButton = () => {
    if (slider !== 0) {
      navigation.navigate('EndCheckIn', {
        moodsChosen, moodValueChosen, activityChosen, sleepScore: slider,
      });
    }
  };

  const skipButton = () => {
    navigation.navigate('EndCheckIn', { moodsChosen, moodValueChosen, activityChosen });
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
            />
          </View>
        </View>
        <View style={styles.faces}>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/images/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/images/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/images/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/images/sleepFace.png')}
            />
          </View>
          <View style={styles.singularFace}>
            <Image
              source={require('../../assets/images/sleepFace.png')}
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

Sleep.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
