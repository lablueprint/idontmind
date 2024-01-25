import { useState } from 'react';
import {
  Text, View, TextInput, StyleSheet, Pressable, Image,
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './SleepStyle';

function Sleep() {

  // slider state
  const [slider, setSlider] = useState(0);

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.rating}>
          <Text>Penis</Text>
        </View>
        <View style={styles.slider}>
          <View style={{transform:[{rotate: "-90deg"}]}}>
            <Slider
              style={{ width: 600, height: 40, alignSelf: 'center' }}
              minimumValue={1}
              maximumValue={7}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onValueChange={onSliderChange}
              step={1}
              vertical={true}
              lowerLimit={2}
              upperLimit={6}
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
          </View >
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
    </View>
  );
}

export default Sleep;
