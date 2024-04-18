import { useState, useEffect } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import PropTypes from 'prop-types';
import nicole from '../../assets/images/sleepFace.png';
import styles from './MoodStyle';

function Activity({ navigation }) {
  // get numPages from route, set progress to 2 / numpages
  const route = useRoute();
  const numPages = route.params?.numPages;
  const newActivity = route.params?.activityPassedIn;
  const newIcon = route.params?.iconChosen;
  const moodsChosen = route.params?.moodsChosen;
  const moodValueChosen = route.params?.moodValueChosen;
  const progress = 2 / numPages;
  // addedActivities array to keep track of the new activities the user has added
  const [addedActivities, setAddedActivities] = useState([]);
  // activityChosen state to keep track of what actiivty the user selects
  const [activityChosen, setActivityChosen] = useState('');

  useEffect(() => {
    // update addedActivities with the route parameters from the AddIcon screen (activity and icon)
    if (newActivity) {
      const newAddedActivities = [...addedActivities];
      newAddedActivities.push([newActivity, newIcon]);
      setAddedActivities(newAddedActivities);
    }
  }, [newActivity, newIcon]);

  const continueButton = () => {
    if (activityChosen !== '') {
      navigation.navigate('Sleep', {
        numPages, moodsChosen, moodValueChosen, activityChosen,
      });
    }
  };

  const skipButton = () => {
    navigation.navigate('Sleep', { numPages, moodsChosen, moodValueChosen });
  };

  // later implement functionality for pressing on a activity button:

  const pressActivity = (activity) => {
    setActivityChosen(activity);
    console.log(activity);
  };

  /* pressing the plus button takes user to AddActivity screen */
  const addActivity = () => {
    navigation.navigate('AddActivity', { numPages });
  };

  // activityImages is an array of each of the rows
  // each row contains activity, image pairs
  const activityImages = [
    [['JUMPED', nicole], ['DANCED', nicole], ['RUN', nicole]],
    [['DASHED', nicole], ['CONSUMED', nicole], ['LAUNCHED', nicole]],
    [['RIZZED', nicole], ['DATED', nicole], ['GAMED', nicole]],
  ];

  // depending on how many activities have been added, the bottom row will look different
  let bottomRow;
  if (addedActivities.length === 0) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable onPress={addActivity} styles={styles.singularMood}>
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
  if (addedActivities.length === 1) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable style={styles.addedMood} onPress={() => pressActivity(addedActivities[0][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedActivities[0][1] }} />
          <Text>{addedActivities[0][0]}</Text>
        </Pressable>
        <Pressable onPress={addActivity} styles={styles.addeMood}>
          <Text style={{
            borderWidth: 2, borderColor: 'black', padding: 20, backgroundColor: 'lightblue',
          }}
          >
            +
          </Text>
        </Pressable>
      </View>
    );
  } else if (addedActivities.length === 2) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable style={styles.singularMood} onPress={() => pressActivity(addedActivities[0][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedActivities[0][1] }} />
          <Text>{addedActivities[0][0]}</Text>
        </Pressable>
        <Pressable onPress={addActivity} styles={styles.singularMood}>
          <Text style={{
            borderWidth: 2, borderColor: 'black', padding: 20, backgroundColor: 'lightblue',
          }}
          >
            +
          </Text>
        </Pressable>
        <Pressable style={styles.singularMood} onPress={() => pressActivity(addedActivities[1][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedActivities[1][1] }} />
          <Text>{addedActivities[1][0]}</Text>
        </Pressable>
      </View>
    );
  } else if (addedActivities.length === 3) {
    bottomRow = (
      <View style={styles.moodRow}>
        <Pressable style={styles.singularMood} onPress={() => pressActivity(addedActivities[0][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedActivities[0][1] }} />
          <Text>{addedActivities[0][0]}</Text>
        </Pressable>
        <Pressable style={styles.singularMood} onPress={() => pressActivity(addedActivities[1][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedActivities[1][1] }} />
          <Text>{addedActivities[1][0]}</Text>
        </Pressable>
        <Pressable style={styles.singularMood} onPress={() => pressActivity(addedActivities[2][0])}>
          <View style={{ width: 120, height: 120, backgroundColor: addedActivities[2][1] }} />
          <Text>{addedActivities[2][0]}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} width={200} style={{ top: '5%' }} />
      <View style={styles.heading}>
        <Text>
          what brought you joy today?
        </Text>
      </View>
      <View style={styles.content}>
        {activityImages.map((row) => (
          <View key={row} style={styles.moodRow}>
            {row.map((pair) => (
              <Pressable
                key={pair}
                style={styles.singularMood}
                onPress={() => pressActivity(pair[0])}
              >
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

export default Activity;

Activity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
