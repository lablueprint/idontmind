import { useState } from 'react';
import {
  Text, View, Pressable,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import PropTypes from 'prop-types';
import styles from './AddColorStyles';

function AddIcon({ navigation }) {
  // get parameters from route (activityPassedIn and numPages)
  const route = useRoute();
  const activityPassedIn = route.params?.activity;

  // array of rows
  // each row contains color, image pairs
  const colorToPicture = [
    [['red', '#ff0000'], ['blue', '#0000ff'], ['green', '#3cb371']],
    [['pink', '#ee82ee'], ['yellow', '#FFF8C6'], ['purple', '#6a5acd']],
    [['sky', '#aec6cf'], ['orange', '#ffb347'], ['gray', '#808080']],
  ];

  // state to keep track of which color the user chose
  const [colorChosen, setColorChosen] = useState('');

  // also navigate back to the original activity screen and pass the activity and color chosen
  const continueButton = () => {
    navigation.navigate('Activity', { activityPassedIn, iconChosen: colorChosen });
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>
          now, select an icon to represent this option.
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

export default AddIcon;

AddIcon.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
