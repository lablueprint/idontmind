import { useState } from 'react';
import {
  Text, View, TextInput,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Slider from '@react-native-community/slider';
// import PropTypes from 'prop-types';

function CheckIn() {
  const [text, setText] = useState('');
  const [check, setCheck] = useState(false);
  const [slider, setSlider] = useState(0);

  const handleInputChange = (input) => {
    setText(input);
  };

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };

  // const handleSubmit = () => {
  //   console.log('submitted!');
  // };

  return (
    <View>
      <Text>hi</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20 }}
        onChangeText={handleInputChange}
        value={text}
      />
      <CheckBox
        title='Click Here'
        checked={check}
        onPress={() => setCheck(!check)}
      />
      <Text>{slider}</Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={9}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={onSliderChange}
        step={1}
      />
    </View>
  );
}

export default CheckIn;
