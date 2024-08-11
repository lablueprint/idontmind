import { useState, useEffect } from 'react';
import {
  Text, View, Pressable, Image, ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import axios from 'axios';
import activity1 from '../../assets/images/activity/activity1.png';
import activity2 from '../../assets/images/activity/activity2.png';
import activity3 from '../../assets/images/activity/activity3.png';
import activity4 from '../../assets/images/activity/activity4.png';
import activity5 from '../../assets/images/activity/activity5.png';
import activity6 from '../../assets/images/activity/activity6.png';
import activity7 from '../../assets/images/activity/activity7.png';
import activity8 from '../../assets/images/activity/activity8.png';
import activity9 from '../../assets/images/activity/activity9.png';

import styles from './MoodStyle';

function Activity({ navigation }) {
  // get numPages from route, set progress to 2 / numpages
  const route = useRoute();

  const [numPages, setNumPages] = useState(route.params?.numPages);
  const [moodValue, setMoodValue] = useState(route.params?.moodValue);
  const [moodsChosen, setMoodsChosen] = useState(route.params?.moodsChosen);
  const [energyChosen, setEnergyChosen] = useState(route.params?.energyChosen);
  const [sleepScore, setSleepScore] = useState(route.params?.sleepScore);
  const [hasHadMeal, setHasHadMeal] = useState(route.params?.hasHadMeal);
  const [water, setWater] = useState(route.params?.water);
  const [exercise, setExercise] = useState(route.params?.exercise);

  const [customActivities, setCustomActivities] = useState([]);
  const [activityChosen, setActivityChosen] = useState({});

  const { email, authHeader } = useSelector((state) => state.auth);

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
  }, [activityChosen]);

  useEffect(() => {
    if (route.params?.activityPassedIn && customActivities.length < 3) {
      const newActivity = {
        activity: route.params.activityPassedIn,
        icon: route.params.iconChosen,
      };
      setCustomActivities((prevActivities) => [...prevActivities, newActivity]);
    }
  }, [route.params]);

  useEffect(() => {
    console.log('Route Params:', route.params);
  }, [route.params]);

  const continueButton = () => {
    if (activityChosen !== null) {
      const data = {
        numPages,
        moodValue,
        moodsChosen,
        energyChosen,
        sleepScore,
        hasHadMeal,
        water,
        exercise,
        activityChosen,
      };
      navigation.navigate('EndCheckIn', data);
    }
  };

  const skipButton = () => {
    const data = {
      numPages,
      moodValue,
      moodsChosen,
      energyChosen,
      sleepScore,
      hasHadMeal,
      water,
      exercise,
      activityChosen: null,
    };
    navigation.navigate('EndCheckIn', data);
  };

  const pressActivity = (activity) => {
    setActivityChosen({activity, activityImg: "" } );
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

  const deleteActivity = async (activityId) => {
    try {
      const res = await axios.delete(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/deleteCustomActivity/${activityId}`, { headers: authHeader });
      if (res.status === 200) {
        setCustomActivities(customActivities.filter((activity) => activity._id !== activityId));
      }
    } catch (err) {
      console.error('Failed to delete activity:', err);
      alert('Failed to delete activity.');
    }
  };

  const renderActivities = (activities) => (
    activities.map((activityObj) => (
      <View key={activityObj._id} style={styles.singularMood}>
        <Pressable onPress={() => pressActivity(activityObj.activity)}>
          <View style={{ width: 120, height: 120, backgroundColor: activityObj.icon }} />
          <Text>{activityObj.activity}</Text>
        </Pressable>
        <Pressable
          onPress={() => deleteActivity(activityObj._id)}
          style={{
            marginLeft: 5, padding: 5, backgroundColor: 'white', borderRadius: 10,
          }}
        >
          <Text>X</Text>
        </Pressable>
      </View>
    ))
  );

  // activityImages is an array of each of the rows
  // each row contains activity, image pairs
  const activityImages = [
    [['Exercise', activity1], ['Eating', activity2], ['Reading', activity3]],
    [['Nature', activity4], ['TV', activity5], ['Music', activity6]],
    [['Art', activity7], ['Friends', activity8], ['Family', activity9]],
  ];

  // Render the activities including the custom ones
  // depending on how many activities have been added, the bottom row will look different

  const renderAddActivityButton = () => {
    console.log('customActivities.length', customActivities.length);
    if (customActivities.length < 3) {
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
        <Text style={styles.headingText}>
          What brought you
        </Text>
        <Text style={styles.headingText}>
          joy today?
        </Text>
      </View>
      <View style={styles.content}>
        {activityImages.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.moodRow}>
            {row.map(([activity, icon]) => (
              <Pressable
                key={activity}
                style={styles.singularMood}
                onPress={() => pressActivity(activity)}
              >
                <Image source={icon} style={styles.icon} />
                <Text style={styles.activityText}>{activity}</Text>
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
