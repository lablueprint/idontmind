import {
  React, View, Text, ScrollView, Modal, Pressable, TouchableOpacity, Image,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import TrendsHeader from '../Components/TrendsHeader';
import Bookmark from '../../Other/Components/Bookmark';
import styles from './TrendsPageStyles';
import { useSelector } from 'react-redux';

// note need to change mood to energy?? (energy is strings but mood is #s)
// note rn water intake in mongo db is used for mood
// mood, sleep, energy, water
function TrendSection({
  header, description, data, data2, avg,
}) {
  let result = '';
  if (avg < 0) {
    result = `${Math.round(avg) * -1}% decrease `;
  } else {
    result = `${Math.round(avg)}% increase `;
  }

  console.log("data: ", data);
  console.log("data2: ", data2);

  return (
    <View style={{
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
    >
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
      <LineChart
        style={{ backgroundColor: 'black' }}
        data={data2.reverse()}
        data2={data.reverse()}
        color1="#5d9e9f"
        color2="#bfdbd7"
        thickness={5}
        width={350}
        height={350}
        curved
        hideDataPoints
        hideRules
        hideYAxisText
        hideAxesAndRules
        yAxisLabelWidth={0}
        yAxisOffset={0}
        isAnimated

      />
      <Text>
        Your energy trended a
        {' '}
        <Text style={{ color: '#82ad98' }}>{result}</Text>
        {avg < 0 ? 'downward' : 'upward'}
        {' '}
        from the previous week.
      </Text>
    </View>
  );
}


TrendSection.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  data2: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  avg: PropTypes.number.isRequired,
  // moodMessage: PropTypes.string.isRequired,
  // sleepMessage: PropTypes.string.isRequired,
  // energyMessage: PropTypes.string.isRequired,
};

export default function TrendsBody({ route }) {
  const [lastPeriodMood, setLastPeriodMood] = useState([]);
  const [currentPeriodMood, setCurrentPeriodMood] = useState([]);
  const [lastPeriodSleep, setLastPeriodSleep] = useState([]);
  const [currentPeriodSleep, setCurrentPeriodSleep] = useState([]);
  const [lastPeriodEnergy, setLastPeriodEnergy] = useState([]);
  const [currentPeriodEnergy, setCurrentPeriodEnergy] = useState([]);
  const [avgMoodPercentage, setAvgMoodPercentage] = useState(0);
  const [avgSleepPercentage, setAvgSleepPercentage] = useState(0);
  const [avgEnergyPercentage, setAvgEnergyPercentage] = useState(0);
  const [moodMessage, setMoodMessage] = useState(null);
  const [sleepMessage, setSleepMessage] = useState(null);
  const [energyMessage, setEnergyMessage] = useState(null);

  const { title } = route.params;

  const { email, userId, authHeader} = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserTimeSeries = async () => {
      try {
        // const weekOffset = 1;
        // const current = new Date();
        // const start = new Date(current);
        // const mid = new Date(current);
        // const end = new Date(current);
        // start.setMonth(mid.getMonth() + 1, 0);
        // mid.setMonth(start.getMonth() + 1, 0); // May 30th
        // // end.setMonth(mid.getMonth() + 1, 0); // May 30th
        // start.setDate(current.getDate() - (14 * weekOffset));
        // mid.setDate(current.getDate() - (7 * weekOffset)); // 7 Days Past
        // // end.setDate(start.getDate()); // Current Date
        // const startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        // const midDate = mid.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        // const endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        //replaced above with this:
        const current = new Date();
        const start = new Date(current);
        const mid = new Date(current);
        const end = new Date(current);
        start.setDate(current.getDate() - 14);
        mid.setDate(current.getDate() - 7);

        const startDate = start.toISOString();
        const midDate = mid.toISOString();
        const endDate = end.toISOString();

        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getUserTimeSeries`, {
          email: 'user1@example.com',
          userId: 'user1',
          startDate,
          midDate,
          endDate,
        }, { headers: authHeader });

        const {
          PercentageAvgMood,
          PercentageAvgSleep,
          PercentageAvgEnergy,
          firstPeriod,
          secondPeriod,
        } = res.data[0];

        setLastPeriodMood(firstPeriod.MoodData);
        setCurrentPeriodMood(secondPeriod.MoodData);
        setLastPeriodSleep(firstPeriod.SleepData);
        setCurrentPeriodSleep(secondPeriod.SleepData);
        setLastPeriodEnergy(firstPeriod.EnergyData);
        setCurrentPeriodEnergy(secondPeriod.EnergyData);
        setAvgMoodPercentage(PercentageAvgMood);
        setAvgSleepPercentage(PercentageAvgSleep);
        setAvgEnergyPercentage(PercentageAvgEnergy);

        console.log('Last period mood: ', lastPeriodMood);
        console.log('Current period mood: ', currentPeriodMood);
        console.log('Last period sleep: ', lastPeriodSleep);
        console.log('Current period sleep: ', currentPeriodSleep);
        console.log('Last period energy: ', lastPeriodEnergy);
        console.log('Current period energy: ', currentPeriodEnergy);
      } catch (err) {
        console.error(err);
      }
    };
    getUserTimeSeries();
  }, []);

  //NOTE!!! i changed the values for the algos to be 1 and 2 are low, 3 and 4 are moderate and 5 is high
  //!!!

  function analyzeMood(currentData, lastData) {
    // combine both datasets to handle a 10-day span
    const totalEntries = 10;
    const currentLength = currentData.length;
    const lastEntriesNeeded = totalEntries - currentLength;
    const combinedData = lastData.slice(-lastEntriesNeeded).concat(currentData);

    // Sort combined data by date
    const sortedCombinedData = combinedData.sort((a, b) => new Date(a.label) - new Date(b.label));
    // Log sorted combined data for debugging
    console.log('energy sortedCombinedData:', sortedCombinedData);
    // Get the most recent 5 entries
    const recentFiveEntries = sortedCombinedData.slice(-5);
    // Log the most recent 5 entries for debugging
    console.log('energy recentFiveEntries:', recentFiveEntries);

    // check for poor sleep quality over the last 5 days
    const lowMood = recentFiveEntries.every((day) => day.value >= 1 && day.value <= 2);
    if (lowMood) {
      setMoodMessage('Consistently Low Mood (5+ nights): Suggest resources on managing low mood or depression, such as mindfulness exercises, physical activity, or seeking professional help.');
      console.log('Mood message', moodMessage);
      return;
    }

    // check for average sleep quality over the last 10 days
    const moderateMood = sortedCombinedData.every((day) => day.value >= 3 && day.value <= 4);
    if (moderateMood) {
      setMoodMessage('Moderate Sleep (10+ nights): Encourage exploration of activities that can enhance mood, like creative hobbies or social engagement.');
      console.log('Mood message', moodMessage);
      return;
    }

    // check for good sleep quality over the last 5 days
    const highMood = recentFiveEntries.every((day) => day.value >= 5);
    if (highMood) {
      setMoodMessage('High Mood (5+ nights):  Provide content on maintaining positive mental health and resilience-building practices.');
      console.log('Mood message', moodMessage);
      return;
    }
    // delete this later:
    console.log('No specific mood pattern detected. Continue monitoring.');
    setMoodMessage(null);
  }

  function analyzeSleepQuality(currentData, lastData) {
    // combine both datasets to handle a 10-day span
    const totalEntries = 10;
    const currentLength = currentData.length;
    const lastEntriesNeeded = totalEntries - currentLength;
    const combinedData = lastData.slice(-lastEntriesNeeded).concat(currentData);

    // Sort combined data by date
    const sortedCombinedData = combinedData.sort((a, b) => new Date(a.label) - new Date(b.label));
    // Log sorted combined data for debugging
    console.log('energy sortedCombinedData:', sortedCombinedData);
    // Get the most recent 5 entries
    const recentFiveEntries = sortedCombinedData.slice(-5);
    // Log the most recent 5 entries for debugging
    console.log('energy recentFiveEntries:', recentFiveEntries);

    // check for poor sleep quality over the last 5 days
    const poorSleep = recentFiveEntries.every((day) => day.value >= 1 && day.value <= 2);
    if (poorSleep) {
      setSleepMessage('Poor Sleep Quality (5+ nights): Offer sleep hygiene tips, relaxation techniques before bed, and suggest limiting screen time in the evening.');
      console.log('Sleep message', sleepMessage);
      return;
    }

    // check for average sleep quality over the last 10 days
    const averageSleep = sortedCombinedData.every((day) => day.value >= 3 && day.value <= 4);
    if (averageSleep) {
      setSleepMessage('Average Sleep Quality (10+ nights): Suggest fine-tuning sleep environment or routine, exploring relaxation methods like meditation.');
      console.log('Sleep message', sleepMessage);
      return;
    }

    // check for good sleep quality over the last 5 days
    const goodSleep = recentFiveEntries.every((day) => day.value >= 5);
    if (goodSleep) {
      setSleepMessage('Good Sleep Quality (5+ nights): Reinforce current sleep habits and explore additional practices for restful sleep, like regular exercise.');
      console.log('Sleep message', sleepMessage);
      return;
    }
    // delete this later:
    console.log('No specific sleep quality pattern detected. Continue monitoring.');
    setSleepMessage(null);
  }

  function analyzeEnergyLevels(currentData, lastData) {
    // note: need to check for if there aren't enough entries to check
    // (like if there weren't 5 past days, you can't do .slice(-5))
  
    // combine both datasets to handle a 10-day span
    const totalEntries = 10;
    const currentLength = currentData.length;
    const lastEntriesNeeded = totalEntries - currentLength;
    const combinedData = lastData.slice(-lastEntriesNeeded).concat(currentData);

    // Sort combined data by date
    const sortedCombinedData = combinedData.sort((a, b) => new Date(a.label) - new Date(b.label));
    // Log sorted combined data for debugging
    console.log('energy sortedCombinedData:', sortedCombinedData);
    // Get the most recent 5 entries
    const recentFiveEntries = sortedCombinedData.slice(-5);
    // Log the most recent 5 entries for debugging
    console.log('energy recentFiveEntries:', recentFiveEntries);

    // check for consistently low energy over the last 5 days
    const lowEnergy = recentFiveEntries.every((day) => day.value >= 1 && day.value <= 2);
    if (lowEnergy) {
      setEnergyMessage('Consistently Low Energy (5+ days): Suggest reviewing diet and physical activity levels, offer strategies for managing stress, and consider recommending a health check-up if persistent.');
      console.log('Energy message', energyMessage);
      return;
    }

    // check for moderate energy over the last 10 days
    const moderateEnergy = sortedCombinedData.every((day) => day.value >= 3 && day.value <= 4);
    if (moderateEnergy) {
      setEnergyMessage('Moderate Energy (10+ days): Encourage activities that naturally boost energy, such as short, brisk walks, hydration, and balanced meals.');
      console.log('Energy message', energyMessage);
      return;
    }

    // check for consistently high energy over the last 5 days
    const highEnergy = recentFiveEntries.every((day) => day.value >= 5);
    if (highEnergy) {
      setEnergyMessage('Consistently High Energy (5+ days): Suggest channeling this energy into productive activities, like exercise, hobbies, or social projects.');
      console.log('Energy message', energyMessage);
      return;
    }
    // delete this later:
    console.log('No specific energy level pattern detected. Continue monitoring.');
    setEnergyMessage(null);
  }

  useEffect(() => {
    if (currentPeriodMood.length && lastPeriodMood.length) {
      analyzeMood(currentPeriodMood, lastPeriodMood);
    }
  }, [currentPeriodMood, lastPeriodMood]);

  useEffect(() => {
    if (currentPeriodSleep.length && lastPeriodSleep.length) {
      analyzeSleepQuality(currentPeriodSleep, lastPeriodSleep);
    }
  }, [currentPeriodSleep, lastPeriodSleep]);

  // (energy levels should be string data, not #s)
  useEffect(() => {
    if (currentPeriodEnergy.length && lastPeriodEnergy.length) {
      analyzeEnergyLevels(currentPeriodEnergy, lastPeriodEnergy);
    }
  }, [currentPeriodEnergy, lastPeriodEnergy]);


  const [modalVisible, setModalVisible] = useState(false);

  const handleTrendPress = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView>
      <LinearGradient colors={['#E0F1F3', '#E5F8F3']} style={{ gap: 35, paddingTop: 50, paddingHorizontal: 30 }}>
        <TrendsHeader title={title} />
        <View>
          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Activity Levels</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>X  </Text>
                  </Pressable>
                </View>
                <Text>{moodMessage}</Text>
                <Text>{sleepMessage}</Text>
                <Text>{energyMessage}</Text>
                <Bookmark
                  key="resourceName (replace)"
                  resourceName="resourceName (replace)"
                  author="author (replace)"
                />
                <TouchableOpacity style={styles.findHelpButton}>
                  <Text style={styles.textStyle}>Find Help</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          { moodMessage || sleepMessage || energyMessage
            ? (
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flexShrink: 1 }}>
                  We noticed some changes in your activity data in the past week!
                </Text>
                <TouchableOpacity onPress={handleTrendPress}>
                  <Image
                    source={require('../../../assets/images/little-guy-notif.png')}
                    style={styles.infoImage}
                  />
                </TouchableOpacity>
              </View>
            )
            : null}
        </View>
        <TrendSection header="Mood Levels" description="Tracking mood changes over time" data={lastPeriodMood} data2={currentPeriodMood} avg={avgMoodPercentage} />
        <TrendSection header="Sleep Quality" description="Monitoring sleep patterns and quality." data={lastPeriodSleep} data2={currentPeriodSleep} avg={avgSleepPercentage} />
        <View style={{ marginBottom: 75 }}>
        <TrendSection header="Energy Levels" description="Observing energy levels throughout the day." data={lastPeriodEnergy} data2={currentPeriodEnergy} avg={avgEnergyPercentage} />
        </View>
      </LinearGradient>
    </ScrollView>

  );
}

TrendsBody.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
