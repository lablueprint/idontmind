import { useState } from 'react';
import {
  Text, View, TextInput, StyleSheet, Pressable, Image,
} from 'react-native';
import { CheckBox } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

function CheckIn({ navigation }) {

  const beginCheckIn = () => {
    navigation.navigate('Mood');
  };

  const continueToDashBoard = () => {
    console.log('heyy');
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>welcome back, diya</Text>
      <Image
          source={require('../../assets/shape.png')}
      />
      <View>
        <Pressable onPress={beginCheckIn}>
          <Text>BEGIN CHECK-IN</Text>
        </Pressable>
        <Pressable onPress={continueToDashBoard}>
          <Text>CONTINUE TO DASHBOARD</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default CheckIn;
