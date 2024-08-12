import { useState, useEffect } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import sleepFace from '../../assets/images/sleepFace.png';
import styles from './MoodStyle';
import infoButton from '../../assets/images/infobutton.png';
import CheckInModal from './CheckInModal';


function Mood({ navigation }) {
  const route = useRoute();
  const newMood = route.params?.moodPassedIn;
  const newColor = route.params?.colorChosen;

  const [addedMoods, setAddedMoods] = useState([]);
  const [moodChosen, setMoodChosen] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    // update addedMoods with the route parameters from the AddColor screen (mood and color)
    if (newMood) {
      const newAddedMoods = [...addedMoods];
      newAddedMoods.push([newMood, newColor]);
      setAddedMoods(newAddedMoods);
    }
  }, [newMood, newColor]);

  const continueButton = () => {
    navigation.navigate('Activity', { moodChosen });
  };

  const skipButton = () => {
    navigation.navigate('Activity');
  };

  // later implement functionality for pressing on a mood button:

  const pressMood = (mood) => {
    setMoodChosen(mood);
    console.log(mood);
  };

  /* pressing the plus button takes user to AddMood screen, passes in setAddedMoods
  and addedMoods so user can edit the addedMoods array */
  const addMood = () => {
    navigation.navigate('AddMood');
  };

  // moodImages is an array of each of the rows
  // each row contains mood, image pairs
  const moodImages = [
    [['NEUTRAL', sleepFace], ['HAPPY', sleepFace], ['SAD', sleepFace]],
    [['UGLY', sleepFace], ['MAD', sleepFace], ['DELIGHTED', sleepFace]],
    [['DEPRESSED', sleepFace], ['STRESSED', sleepFace], ['OVERWHELMED', sleepFace]],
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
      <View style={styles.heading}>
        <Text>
          how are you feeling today, really?
        </Text>
        <Pressable onPress={toggleModal}>
          <Image source={infoButton} style={{width: 16, height: 16, marginTop: 12, marginLeft: 10}} />
        </Pressable>
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
      <CheckInModal 
        checkInQNum = {0}
        modalVisible = {modalVisible}
        toggleModal = {toggleModal}
        />
    </View>
  );
}

export default Mood;

Mood.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
