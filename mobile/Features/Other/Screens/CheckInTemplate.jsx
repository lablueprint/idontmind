import { useState } from 'react';
import {
  Text, View, TextInput, StyleSheet, Button,
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

const styles = StyleSheet.create({
  title: {
    color: 'black',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function CheckInTemplate() {
  // short answer state
  const [shortAnswerText, setShortAnswerText] = useState('');

  // multiple select checkbox staes
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  // multiple choice state
  const [selectedIndex, setIndex] = useState(0);

  // slider state
  const [slider, setSlider] = useState(0);

  // dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pear', value: 'pear' },
  ]);

  const handleInputChange = (input) => {
    setShortAnswerText(input);
  };

  const onSliderChange = (sliderValue) => {
    setSlider(sliderValue);
  };

  const handleSubmit = () => {
    console.log('submitted!');
  };

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Text style={styles.title}>Check-In Form</Text>
      <Text style={{ marginTop: 20 }}>Short Answer</Text>
      <TextInput
        style={{
          height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 8, width: '90%', alignSelf: 'center',
        }}
        onChangeText={handleInputChange}
        value={shortAnswerText}
      />
      <Text style={{ marginTop: 20 }}>Checkboxes; Select All that Apply</Text>
      <View style={{ width: '96.2%', alignSelf: 'center' }}>
        <CheckBox
          title="Yes"
          checked={check1}
          onPress={() => setCheck1(!check1)}
        />
        <CheckBox
          title="No"
          checked={check2}
          onPress={() => setCheck2(!check2)}
        />
      </View>
      <Text style={{ marginTop: 20 }}>Slider</Text>
      <Text style={{ alignSelf: 'center' }}>{slider}</Text>
      <Slider
        style={{ width: 200, height: 40, alignSelf: 'center' }}
        minimumValue={0}
        maximumValue={9}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={onSliderChange}
        step={1}
      />
      <Text style={{ marginTop: 20, marginBottom: 8 }}>Dropdown</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ width: '90%', alignSelf: 'center' }}
        dropDownContainerStyle={{ width: '90%', alignSelf: 'center' }}
      />
      <Text style={{ marginTop: 20, marginBottom: 8 }}>Multiple Choice</Text>
      <View style={{ marginBottom: 10 }}>
        <CheckBox
          checked={selectedIndex === 0}
          onPress={() => setIndex(0)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="hey"
        />
        <CheckBox
          checked={selectedIndex === 1}
          onPress={() => setIndex(1)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="heyy"
        />
        <CheckBox
          checked={selectedIndex === 2}
          onPress={() => setIndex(2)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          title="heyyy"
        />
      </View>
      <Button
        title="Submit"
        onPress={() => handleSubmit()}
      />
    </View>
  );
}

export default CheckInTemplate;
