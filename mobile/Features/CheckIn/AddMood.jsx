import { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Text, View, TextInput, StyleSheet, Pressable, Image, TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import styles from './MoodStyle';

function AddMood({ navigation }) {
    const [text, setText] = useState('')
    const goToAddColor = () => {
        navigation.navigate('AddColor');
    };
    const handleInputChange = (input) => {
        setText(input);
    };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
        <View style={styles.heading}>
        <Text>
          type out a custom emotion here!
        </Text>
      </View>
      <View style={styles.content}>
        <TextInput
            placeholder="Start typing..."
            style={{
            height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 8, width: '90%', alignSelf: 'center',
            }}
            onChangeText={handleInputChange}
            value={text}
        />
        <Pressable onPress={goToAddColor}>
            <Text>check</Text>
        </Pressable>
    </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

export default AddMood;
