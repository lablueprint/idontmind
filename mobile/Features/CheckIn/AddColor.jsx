import { useState } from 'react';
import { Dimensions } from 'react-native';
import {
  Text, View, TextInput, StyleSheet, Pressable, Image, TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import tempColor from '../../assets/colorSquare.png'
import styles from './AddColorStyles';

function AddColor({ navigation }) {
    const colorToPicture = [
        [['red',tempColor], ['blue', tempColor], ['47', tempColor]],
        [['dog', tempColor], ['Nicole', tempColor], ['no', tempColor]],
        [['skeeeeyee', tempColor], ['help', tempColor], ['how', tempColor]],
    ];

    const continueButton = () => {
        navigation.navigate('Mood');
      };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>
          now, select a color to represent this mood!
        </Text>
      </View>
      <View style={styles.content}>
        {colorToPicture.map((pairs) => (
            <View style={styles.colorRow}>
              <View style={styles.singularColor}>
                <Image
                    source={pairs[0][1]}
                />
                <Text>{pairs[0][0]}</Text>
              </View>
              <View style={styles.singularColor}>
                <Image
                    source={pairs[1][1]}
                />
                <Text>{pairs[1][0]}</Text>
              </View>
              <View style={styles.singularColor}>
                <Image
                    source={pairs[2][1]}
                />
                <Text>{pairs[2][0]}</Text>
              </View>
            </View>
        ))}
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={continueButton}>
          <Text>CONTINUE</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AddColor;
