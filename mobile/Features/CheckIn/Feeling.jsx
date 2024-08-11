import React, { useState, useEffect } from 'react';
import {
  Text, View, Pressable, TouchableOpacity, Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import styles from './FeelingStyle';
import moodWords from './MoodWords.json';

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
    'Worst',
    'Poor',
    'Okay',
    'Good',
    'Great',
  ];

  const [selectedCoping, setSelectedCoping] = useState([]);

  const [slider, setSlider] = useState(moodValue !== undefined ? moodValue : 2);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  const [moodTerms, setMoodTerms] = useState(moodWords[captions[slider - 1]]);

  useEffect(() => {
    setIsContinueEnabled(Object.values(selectedCoping).some((value) => value));
  }, [selectedCoping]);

  const toggleCoping = (term) => {
    setSelectedCoping((prevSelected) => {
      if (prevSelected.includes(term)) {
        return prevSelected.filter((item) => item !== term);
      }
      return [...prevSelected, term];
    });
  };

  const onSliderChange = (sliderValue) => {
    if (moodValue === undefined) {
      setSlider(sliderValue);
      setMoodTerms(moodWords[captions[sliderValue-1]]);
    }
  };

  const continueButton = () => {
    if (isContinueEnabled) {
      navigation.navigate('Energy', { numPages, moodValueChosen: slider, moodsChosen: selectedCoping });
    }
  };

  const skipButton = () => {
    navigation.navigate('Energy', { numPages, moodValueChosen: slider, moodsChosen: null });
  };

  return (
    <View style={{ backgroundColor: '#E5F8F3' }}>
      <View style={styles.container}>        
        <Text style={styles.heading}>
          How are you feeling today, really?
        </Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginBottom: -10, fontSize: 40, fontWeight: 600 }}>{captions[moodValue - 1]}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <View style={[
                styles.imageContainer,
                {
                  width: 40 + (slider === moodValue ? 20 : 0),
                  height: 40 + (slider === moodValue ? 20 : 0),
                },
                slider === moodValue ? styles.shadowEffect : null,
              ]}
              >
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
              value={slider - 1}
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
            <Text style={{ fontSize: 16, textAlign: 'center', marginTop: '15%' }}>Select at least 1 mood word to continue.</Text>
          </View>
          <View style={styles.pills}>
            {moodTerms.map((term) => (
              <View
                key={term}
                style={[styles.pill, selectedCoping.includes(term) ? styles.selectedPill : styles.nonselectedPill]}
              >
                <Pressable onPress={() => toggleCoping(term)}>
                  <Text>{term}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <Pressable
          style={[
            styles.continueButton,
            { backgroundColor: isContinueEnabled ? '#374342' : '#C6CECE' },
          ]}
          onPress={continueButton}
          disabled={!isContinueEnabled}
        >
          <Text style={[styles.continueText, { color: isContinueEnabled ? '#FFFFFF' : '#000000' }]}>Continue</Text>
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
