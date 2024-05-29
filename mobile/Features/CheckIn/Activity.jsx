import { useState, useEffect } from 'react';
import {
  Text, View, Pressable, Image, ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import nicole from '../../assets/images/sleepFace.png';
import styles from './MoodStyle';

function Activity({ navigation }) {
  // get numPages from route, set progress to 2 / numpages
  const route = useRoute();

  // note: these are undefined if you go here from the Meal page
  // const newActivity = route.params?.activityPassedIn;
  // const newIcon = route.params?.iconChosen;
  // console.log(newActivity);
  // console.log(newIcon);

  const [numPages, setNumPages] = useState(route.params?.numPages);
  const [moodValue, setMoodValue] = useState(route.params?.moodValue);
  const [moodsChosen, setMoodsChosen] = useState(route.params?.moodsChosen);
  const [energyChosen, setEnergyChosen] = useState(route.params?.energyChosen);
  const [sleepScore, setSleepScore] = useState(route.params?.sleepScore);
  const [hasHadMeal, setHasHadMeal] = useState(route.params?.hasHadMeal);

  const [customActivities, setCustomActivities] = useState([]);
  const [addedActivities, setAddedActivities] = useState([]);
  const [activityChosen, setActivityChosen] = useState('');

  const { email, id, authHeader } = useSelector((state) => state.auth);

  const fetchCustomActivities = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getCustomActivities`, {
        headers: authHeader,
        params: { email },
      });
      setCustomActivities(response.data.customActivities);
    } catch (err) {
      console.error('Failed to fetch custom activities:', err);
    }
  };

  useEffect(() => {
    fetchCustomActivities();
  }, [activityChosen, addedActivities]);

  useEffect(() => {
    if (route.params?.activityPassedIn && customActivities.length + addedActivities.length < 3) {
      const newAddedActivities = [...addedActivities,
        [route.params.activityPassedIn, route.params.iconChosen]];
      setAddedActivities(newAddedActivities);
    }
  }, [route.params]);

  useEffect(() => {
    console.log('Route Params:', route.params);
  }, [route.params]);

  const submitData = async (chosenActivity) => {
    const data = {
      metadata: {
        email,
        userId: id,
      },
      timestamp: new Date(),
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal,
      activityChosen: chosenActivity,
    };

    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/insertTimeSeries`, data, { headers: authHeader });
      console.log('Response:', res); // Log the response
      if (res.status === 201) {
        navigation.navigate('EndCheckIn');
      } else {
        console.error('Failed to save data:', res.statusText);
      }
    } catch (err) {
      console.error('Failed to fetch:', err);
      if (err.response) {
        console.error('Error response data:', err.response.data);
      } else if (err.request) {
        console.error('Error request:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
    }
  };

  const continueButton = () => {
    if (activityChosen !== '') {
      submitData(activityChosen);
    }
  };

  const skipButton = () => {
    submitData(null);
  };

  // later implement functionality for pressing on a activity button:

  const pressActivity = (activity) => {
    setActivityChosen(activity);
    console.log(activity);
  };

  /* pressing the plus button takes user to AddActivity screen */
  const addActivity = () => {
    if (customActivities.length < 3) {
      navigation.navigate('AddActivity');
    } else {
      alert('You can only add up to 3 custom activities.');
    }
  };

  const renderActivities = (activities) => (
    activities.map(({ activity, icon }, index) => (
      <Pressable key={index} style={styles.singularMood} onPress={() => pressActivity(activity)}>
        <View style={{ width: 120, height: 120, backgroundColor: icon }} />
        <Text>{activity}</Text>
      </Pressable>
    ))
  );

  // activityImages is an array of each of the rows
  // each row contains activity, image pairs
  const activityImages = [
    [['JUMPED', nicole], ['DANCED', nicole], ['RUN', nicole]],
    [['DASHED', nicole], ['CONSUMED', nicole], ['LAUNCHED', nicole]],
    [['RIZZED', nicole], ['DATED', nicole], ['GAMED', nicole]],
  ];

  // Render the activities including the custom ones
  // depending on how many activities have been added, the bottom row will look different

  const renderAddActivityButton = () => {
    if (customActivities.length + addedActivities.length < 3) {
      return (
        <Pressable onPress={addActivity} style={styles.singularMood}>
          <Text style={{
            borderWidth: 2, borderColor: 'black', padding: 20, backgroundColor: 'lightblue',
          }}
          >
            +
          </Text>
        </Pressable>
      );
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heading}>
        <Text>
          what brought you joy today?
        </Text>
      </View>
      <View style={styles.content}>
        {activityImages.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.moodRow}>
            {row.map(([activity, icon]) => (
              <Pressable key={activity} style={styles.singularMood} onPress={() => pressActivity(activity)}>
                <Image source={icon} />
                <Text>{activity}</Text>
              </Pressable>
            ))}
          </View>
        ))}
        <View style={styles.moodRow}>
          {renderActivities(customActivities)}
          {renderAddActivityButton()}
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={continueButton}>
          <Text>CONTINUE</Text>
        </Pressable>
        <Pressable onPress={skipButton}>
          <Text>SKIP</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default Activity;

Activity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
