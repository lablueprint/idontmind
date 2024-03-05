import { useState, useEffect } from 'react';
import {
  Text, View, TextInput, StyleSheet, Pressable, Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import shape from '../assets/shape.png';
import styles from './FeelingStyle';

function Feeling({ navigation }) {

  const [selectedCoping, setSelectedCoping] = useState({
    'calm': false, 
    'unfazed': false, 
    'numb': false, 
    'cloudy': false,
    'calm1': false, 
    'unfazed1': false, 
    'numb1': false, 
    'cloudy1': false,
    'calm2': false, 
    'unfazed2': false, 
    'numb2': false, 
    'cloudy2': false,
    'calm3': false, 
    'unfazed3': false, 
    'numb3': false, 
    'cloudy3': false,
  });

  const [slider, setSlider] = useState(0);

  const toggleCoping = (term) => {
    let temp = {...selectedCoping};
    if (temp[term] === false) {
      temp[term] = true;
    }
    else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedCoping(temp);
  };

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
    console.log(sliderValue);
  };
  
  return (
    <View style={styles.container}>
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
            <View key={cope[0]} style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}>
              <Pressable onPress={() => toggleCoping(cope[0])}>
                <Text>{cope[0]}</Text>
              </Pressable>
            </View>
        ))}
        </View>
      </View>
    </View>
  );
}

export default Feeling;