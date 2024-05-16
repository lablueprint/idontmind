import React, { useState } from 'react';
import { Text, View, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-progress/Bar';
import { useRoute } from '@react-navigation/native';
import styles from './FeelingStyle';

function Feeling({ navigation }) {
  const route = useRoute();
  const numPages = route.params?.numPages;
  const moodValue = route.params?.moodValueChosen;

  const progress = 1 / numPages;

  const { width } = Dimensions.get('window');
  const images = [
    require('../../assets/images/crylilguy.png'),
    require('../../assets/images/sadlilguy.png'),
    require('../../assets/images/normallilguy.png'),
    require('../../assets/images/smilinglilguy.png'),
    require('../../assets/images/happylilguy.png'),
  ];

  const captions = [
    'Sad',
    'Meh',
    'Okay',
    'Good',
    'Great',
  ];

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

  const toggleCoping = (term) => {
    const temp = { ...selectedCoping };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedCoping(temp);
  };

  const [slider, setSlider] = useState(moodValue !== undefined ? moodValue : 2);

  const onSliderChange = (sliderValue) => {
    if (moodValue === undefined) {
      setSlider(sliderValue);
    }
  };

  const continueButton = () => {
    if (Object.values(selectedCoping).some((value) => value)) {
      navigation.navigate('Energy', { numPages, moodValueChosen: slider, moodsChosen: selectedCoping });
    }
  };

  const skipButton = () => {
    navigation.navigate('Energy', { numPages, moodValueChosen: slider });
  };

  return (
    <View style={{ backgroundColor: '#E5F8F3' }}>
      <View style={styles.container}>
        <ProgressBar progress={progress} width={200} style={{ top: '-10%' }} />
        <Text style={styles.heading}>
          How are you feeling today, really?
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginBottom: -10, fontSize: 40, fontWeight: 600 }}>{captions[moodValue]}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <View style={[
                styles.imageContainer,
                {
                  width: 40 + (slider === moodValue ? 20 : 0),
                  height: 40 + (slider === moodValue ? 20 : 0),
                },
                slider === moodValue ? styles.shadowEffect : null,
              ]}>
                <Image
                  source={images[moodValue]}
                  style={[
                    styles.image,
                    {
                      width: 40 + (slider === moodValue ? 20 : 0),
                      height: 40 + (slider === moodValue ? 20 : 0),
                    },
                  ]}
                />
              </View>
            </View>
            <Slider
              style={{ width: width * 0.6, marginLeft: 10 }}
              minimumValue={0}
              maximumValue={4}
              step={1}
              value={slider}
              onValueChange={onSliderChange}
              disabled={moodValue !== undefined}
              minimumTrackTintColor="#374342"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="#374342"
            />
          </View>
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
        <Pressable style={styles.continueButton} onPress={continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
        <TouchableOpacity onPress={skipButton} style={styles.skip}>
          <Text>
            SKIP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Feeling.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Feeling;
