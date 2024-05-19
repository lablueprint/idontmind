import { useState } from 'react';
import {
  Text, View, Pressable,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './AddColorStyles';

function AddColor({ navigation }) {
  // get parameters from route (moodPassedIn and numPages)
  const route = useRoute();
  const moodPassedIn = route.params?.mood;

  // array of rows
  // each row contains color, image pairs
  const colorToPicture = [
    [['red', '#ff0000'], ['blue', '#0000ff'], ['green', '#3cb371']],
    [['pink', '#ee82ee'], ['yellow', '#FFF8C6'], ['purple', '#6a5acd']],
    [['sky', '#aec6cf'], ['orange', '#ffb347'], ['gray', '#808080']],
  ];

  // state to keep track of which color the user chose
  const [colorChosen, setColorChosen] = useState('');

  // also navigate back to the original mood screen and pass the mood and color chosen
  const continueButton = () => {
    navigation.navigate('Mood', { moodPassedIn, colorChosen });
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>
          now, select a color to represent this mood!
        </Text>
      </View>
      <View style={styles.content}>
        {colorToPicture.map((row) => (
          <View key={row} style={styles.colorRow}>
            {row.map((pair) => (
              <Pressable
                key={pair}
                style={styles.singularColor}
                onPress={() => setColorChosen(pair[1])}
              >
                <View style={{ width: 120, height: 120, backgroundColor: pair[1] }} />
                <Text>{pair[0]}</Text>
              </Pressable>
            ))}
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
