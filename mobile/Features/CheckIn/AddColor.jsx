import { useState } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import PropTypes from 'prop-types';
import tempColor from '../../assets/colorSquare.png';
import styles from './AddColorStyles';

function AddColor({ navigation }) {
  // get parameters from route (setAddedMoods, addedMoods, moodPassedIn)
  const route = useRoute();
  const setAddedMoods = route.params?.setAddedMoods;
  const addedMoods = route.params?.addedMoods;
  const moodPassedIn = route.params?.mood;

  // set progress
  const numPages = route.params?.numPages;
  const progress = 1 / numPages;

  // array of rows
  // each row contains color, image pairs
  const colorToPicture = [
    [['red', tempColor], ['blue', tempColor], ['47', tempColor]],
    [['dog', tempColor], ['Nicole', tempColor], ['no', tempColor]],
    [['skeeeeyee', tempColor], ['help', tempColor], ['how', tempColor]],
  ];

  // state to keep track of which color the user chose
  const [colorChosen, setColorChosen] = useState('');

  // update the addedMoods array from the original mood screen with the mood/color the user chose
  // also navigate back to the original mood screen
  const continueButton = () => {
    const newAddedMoods = [...addedMoods];
    newAddedMoods.push([moodPassedIn, colorChosen]);
    setAddedMoods(newAddedMoods);
    navigation.navigate('Mood', { numPages });
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} width={200} style={{ top: '5%' }} />
      <View style={styles.heading}>
        <Text>
          now, select a color to represent this mood!
        </Text>
      </View>
      <View style={styles.content}>
        {colorToPicture.map((pairs) => (
          <View key={pairs[0]} style={styles.colorRow}>
            <Pressable style={styles.singularColor} onPress={() => setColorChosen(pairs[0][0])}>
              <Image
                source={pairs[0][1]}
              />
              <Text>{pairs[0][0]}</Text>
            </Pressable>
            <Pressable style={styles.singularColor} onPress={() => setColorChosen(pairs[1][0])}>
              <Image
                source={pairs[1][1]}
              />
              <Text>{pairs[1][0]}</Text>
            </Pressable>
            <Pressable style={styles.singularColor} onPress={() => setColorChosen(pairs[2][0])}>
              <Image
                source={pairs[2][1]}
              />
              <Text>{pairs[2][0]}</Text>
            </Pressable>
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

AddColor.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
