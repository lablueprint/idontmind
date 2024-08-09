import React, { useState } from 'react';
import {
  Text, View, Pressable, TouchableOpacity, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import styles from './EnergyStyles';

function Energy({ navigation }) {
  const route = useRoute();
  const numPages = route.params?.numPages;
  const moodValue = route.params?.moodValueChosen;
  const moodsChosen = route.params?.moodsChosen;
  const progress = 1 / numPages;

  const { width } = Dimensions.get('window');

  const images = [
    require('../../assets/images/bolt1.png'),
    require('../../assets/images/bolt2.png'),
    require('../../assets/images/bolt3.png'),
    require('../../assets/images/bolt4.png'),
    require('../../assets/images/bolt5.png'),
  ];

  const captions = [
    'None',
    'Low',
    'Okay',
    'Good',
    'High',
  ];

  const [slider, setSlider] = useState(2);
  const [sliderMoved, setSliderMoved] = useState(false);

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
    if (!sliderMoved) {
      setSliderMoved(true);
    }
  };

  const onImagePress = (index) => {
    setSlider(index);
    if (!sliderMoved) {
      setSliderMoved(true);
    }
  };

  // right now i have a check in flow for a user every day that goes from page to page
  // CheckIn -> PreFeeling -> Feeling -> Energy -> Sleep -> Meal -> Water -> Exercise -> Activity -> EndCheckIn
  // checkIn, prefeeling, feeling, energy, sleep, and endcheckin are the core checkin pages that will be there for every user
  // but meal, water, exercise, and activity are optional and are only there if the user specified so
  // each user has a schema that includes an attribute called optionalCheckins which is an array of strings: optionalCheckins: ["meal", "water", "exercise", "activity"].
  // so for example, only if "meal" is in the optionalCheckins array, will the page be part of the checkin flow
  // help me implement this. right now, my sleep page goes straight to the meal  page if you press the continue button, for example, but now it should take into account the optionalCheckins array for each user
  // get optionalCheckins by doing   const { optionalCheckins } = useSelector((state) => state.auth);

  const continueButton = () => {
    navigation.navigate('Sleep', {
      numPages, moodValue, moodsChosen, energyChosen: slider + 1,
    });
  };

  const skipButton = () => {
    navigation.navigate('Sleep', {
      numPages, moodValue, moodsChosen, energyChosen: null,
    });
  };

  return (
    <View style={{ backgroundColor: '#E5F8F3' }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>
            How would you describe your energy today?
          </Text>
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', width: width * 0.8, alignSelf: 'center',
          }}
          >
            {images.map((image, index) => (
              <Pressable key={index} onPress={() => onImagePress(index)}>
                <View key={index} style={{ alignItems: 'center' }}>
                  <View style={[
                    styles.imageContainer,
                    { width: 40, height: 40 },
                    index <= slider ? styles.shadowEffect : null,
                  ]}
                  >
                    <Image
                      source={index <= slider ? image : require('../../assets/images/bolt0.png')}
                      style={styles.image}
                    />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
          <Text style={{
            marginTop: '10%', fontSize: 40, fontWeight: 'bold', textAlign: 'center',
          }}
          >
            {captions[slider]}
          </Text>
          <Slider
            style={{ width: width * 0.9, marginTop: 20 }}
            minimumValue={0}
            maximumValue={4}
            step={1}
            value={slider}
            onValueChange={onSliderChange}
            minimumTrackTintColor="#374342"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#374342"
          />
        </View>
        <View style={styles.bottomButtonsContainer}>
          <Pressable
            style={[
              styles.continueButton,
              { backgroundColor: sliderMoved ? '#374342' : '#C6CECE' },
            ]}
            onPress={continueButton}
            disabled={!sliderMoved}
          >
            <Text style={[styles.continueText, { color: sliderMoved ? '#FFFFFF' : '#000000' }]}>
              Continue
            </Text>
          </Pressable>
          <TouchableOpacity onPress={skipButton} style={styles.skip}>
            <Text>
              SKIP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Energy;

Energy.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
