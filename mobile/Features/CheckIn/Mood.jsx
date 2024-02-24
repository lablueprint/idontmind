import { useState } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import PropTypes from 'prop-types';
import nicole from '../../assets/sleepFace.png';
import styles from './MoodStyle';

function Mood({ navigation }) {
  // get numPages from route, set progress to 1 / numpages
  const route = useRoute();
  const numPages = route.params?.numPages;
  const progress = 1 / numPages;
  // addedMoods array to keep track of the new moods the user has added
  const [addedMoods, setAddedMoods] = useState([]);

  const continueButton = () => {
    // console.log('continue');
    navigation.navigate('Sleep', { numPages });
  };

  const skipButton = () => {
    // console.log('skip');
  };

  // later implement functionality for pressing on a mood button:

  const pressMood = (mood) => {
    console.log(mood);
  };

  /* pressing the plus button takes user to AddMood screen, passes in setAddedMoods
  and addedMoods so user can edit the addedMoods array */
  const addMood = () => {
    // console.log('addedMood');
    navigation.navigate('AddMood', { setAddedMoods, addedMoods, numPages });
  };

  // moodImages is an array of each of the rows
  // each row contains mood, image pairs
  const moodImages = [
    [['NEUTRAL', nicole], ['HAPPY', nicole], ['SAD', nicole]],
    [['UGLY', nicole], ['MAD', nicole], ['DELIGHTED', nicole]],
    [['DEPRESSED', nicole], ['STRESSED', nicole], ['OVERWHELMED', nicole]],
  ];

  // depending on how many moods have been added, the bottom row will look different
  let bottomRow;
  if (addedMoods.length === 0) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable onPress={addMood} styles={styles.singularMood}>
          <Text style={{
            borderWidth: 2, borderColor: 'black', padding: 20, backgroundColor: 'lightblue',
          }}
          >
            +
          </Text>
        </Pressable>
      </View>
    );
  }
  if (addedMoods.length === 1) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable style={styles.addedMood} onPress={() => pressMood(addedMoods[0][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedMoods[0][1] }} />
          <Text>{addedMoods[0][0]}</Text>
        </Pressable>
        <Pressable onPress={addMood} styles={styles.addeMood}>
          <Text style={{
            borderWidth: 2, borderColor: 'black', padding: 20, backgroundColor: 'lightblue',
          }}
          >
            +
          </Text>
        </Pressable>
      </View>
    );
  } else if (addedMoods.length === 2) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable style={styles.singularMood} onPress={() => pressMood(addedMoods[0][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedMoods[0][1] }} />
          <Text>{addedMoods[0][0]}</Text>
        </Pressable>
        <Pressable onPress={addMood} styles={styles.singularMood}>
          <Text style={{
            borderWidth: 2, borderColor: 'black', padding: 20, backgroundColor: 'lightblue',
          }}
          >
            +
          </Text>
        </Pressable>
        <Pressable style={styles.singularMood} onPress={() => pressMood(addedMoods[1][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedMoods[1][1] }} />
          <Text>{addedMoods[1][0]}</Text>
        </Pressable>
      </View>
    );
  } else if (addedMoods.length === 3) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable style={styles.singularMood} onPress={() => pressMood(addedMoods[0][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedMoods[0][1] }} />
          <Text>{addedMoods[0][0]}</Text>
        </Pressable>
        <Pressable style={styles.singularMood} onPress={() => pressMood(addedMoods[1][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedMoods[1][1] }} />
          <Text>{addedMoods[1][0]}</Text>
        </Pressable>
        <Pressable style={styles.singularMood} onPress={() => pressMood(addedMoods[2][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedMoods[2][1] }} />
          <Text>{addedMoods[2][0]}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} width={200} style={{ top: '5%' }} />
      <View style={styles.heading}>
        <Text>
          how are you feeling today, really?
        </Text>
      </View>
      <View style={styles.content}>
        {moodImages.map((row) => (
          <View key={row} style={styles.moodRow}>
            {row.map((pair) => (
              <Pressable key={pair} style={styles.singularMood} onPress={() => pressMood(pair[0])}>
                <Image
                  source={pair[1]}
                />
                <Text>{pair[0]}</Text>
              </Pressable>
            ))}
          </View>
        ))}
        {bottomRow}
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={continueButton}>
          <Text>CONTINUE</Text>
        </Pressable>
        <Pressable onPress={skipButton}>
          <Text>SKIP</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Mood;

Mood.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
