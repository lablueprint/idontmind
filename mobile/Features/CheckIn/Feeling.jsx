import { useState } from 'react';
import {
  Text, View, Pressable, TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar';
import { useRoute } from '@react-navigation/native';
import styles from './FeelingStyle';

function Feeling({ navigation }) {
  const route = useRoute();
  // update progress
  const numPages = route.params?.numPages;
  const progress = 1 / numPages;
  const [selectedCoping, setSelectedCoping] = useState({
    calm: false,
    unfazed: false,
    numb: false,
    cloudy: false,
    calm1: false,
    unfazed1: false,
    numb1: false,
    cloudy1: false,
    calm2: false,
    unfazed2: false,
    numb2: false,
    cloudy2: false,
    calm3: false,
    unfazed3: false,
    numb3: false,
    cloudy3: false,
  });

  const [slider, setSlider] = useState(0);
  const toggleCoping = (term) => {
    const temp = { ...selectedCoping };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedCoping(temp);
  };

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };

  const continueButton = () => {
    if (Object.values(selectedCoping).some((value) => value)) {
      navigation.navigate('Activity', { numPages, moodValue: slider, moodsChosen: selectedCoping });
    }
  };

  const skipButton = () => {
    navigation.navigate('Activity', { numPages, moodValue: slider });
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} width={200} style={{ top: '-10%' }} />
      <View style={styles.heading}>
        <Text>
          How are you feeling today, really?
        </Text>
      </View>
      <View>
        <Slider
          style={{ width: 200, height: 40, alignSelf: 'center' }}
          minimumValue={0}
          maximumValue={9}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={onSliderChange}
          step={1}
        />
      </View>
      <View style={styles.heading}>
        <View>
          <Text>Select at least 1 mood to continue.</Text>
        </View>
        <View style={styles.pills}>
          {Object.entries(selectedCoping).map((cope) => (
            <View
              key={cope[0]}
              style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
            >
              <Pressable onPress={() => toggleCoping(cope[0])}>
                <Text>{cope[0]}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={continueButton}>
          <Text>
            Continue
          </Text>
        </TouchableOpacity>
        <View class={styles.skip}>
          <TouchableOpacity onPress={skipButton}>
            <Text>
              SKIP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Feeling;

Feeling.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
