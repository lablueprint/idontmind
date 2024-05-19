import {
  React, View, Text, ScrollView, Modal, Pressable, TouchableOpacity, Image,
} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import TrendsHeader from '../Components/TrendsHeader';
import Bookmark from '../../Features/Other/Components/Bookmark';
import styles from './TrendsPageStyles';

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

  return (
    <View style={{
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
    >
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 14 }}>{description}</Text>
      <LineChart
        style={{ backgroundColor: 'black' }}
        data={data}
        data2={data2}
        color1="#bfdbd7"
        color2="#5d9e9f"
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
  const [lastPeriodSleep, setLastPeriodSleep] = useState([]);
  const [currentPeriodSleep, setCurrentPeriodSleep] = useState([]);
  const [lastPeriodWater, setLastPeriodWater] = useState([]);
  const [currentPeriodWater, setCurrentPeriodWater] = useState([]);
  const [avgSleepPercentage, setAvgSleepPercentage] = useState(0);
  const [avgWaterPercentage, setAvgWaterPercentage] = useState(0);
  const [moodMessage, setMoodMessage] = useState(null);
  const [sleepMessage, setSleepMessage] = useState(null);
  const [energyMessage, setEnergyMessage] = useState(null);

  const { title } = route.params;

  useEffect(() => {
    const getUserTimeSeries = async () => {
      try {
        const weekOffset = 1;
        const current = new Date();
        const start = new Date(current);
        const mid = new Date(current);
        const end = new Date(current);
        start.setMonth(mid.getMonth() + 1, 0);
        mid.setMonth(start.getMonth() + 1, 0); // May 30th
        // end.setMonth(mid.getMonth() + 1, 0); // May 30th
        start.setDate(current.getDate() - (14 * weekOffset));
        mid.setDate(current.getDate() - (7 * weekOffset)); // 7 Days Past
        // end.setDate(start.getDate()); // Current Date
        const startDate = start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const midDate = mid.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const endDate = end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getUserTimeSeries`, {
          email: 'booooooop',
          userId: 'booop',
          startDate,
          midDate,
          endDate,
        });

        const {
          PercentageAvgSleep, PercentageAvgWater, firstPeriod, secondPeriod,
        } = res.data[0];

        setLastPeriodSleep(firstPeriod.SleepData);
        setCurrentPeriodSleep(secondPeriod.SleepData);
        setLastPeriodWater(firstPeriod.WaterData);
        setCurrentPeriodWater(secondPeriod.WaterData);
        setAvgSleepPercentage(PercentageAvgSleep);
        setAvgWaterPercentage(PercentageAvgWater);

        // console.log('Last period sleep: ', lastPeriodSleep);
        // console.log('Current period sleep: ', currentPeriodSleep);
        // console.log('Last period water: ', lastPeriodWater);
        // console.log('Current period water: ', currentPeriodWater);
      } catch (err) {
        console.error(err);
      }
    };
    getUserTimeSeries();
  }, []);

  function analyzeMood(currentData, lastData) {
    // combine both datasets to handle a 10-day span
    const totalEntries = 10;
    const currentLength = currentData.length;
    const lastEntriesNeeded = totalEntries - currentLength;
    const combinedData = lastData.slice(-lastEntriesNeeded).concat(currentData);

    // check for poor sleep quality over the last 5 days
    const lowMood = combinedData.slice(-5).every((day) => day.value >= 1 && day.value <= 4);
    console.log('mood combinedData.slice(-5): ', combinedData.slice(-5));
    if (lowMood) {
      setMoodMessage('Consistently Low Mood (5+ nights): Suggest resources on managing low mood or depression, such as mindfulness exercises, physical activity, or seeking professional help.');
      console.log('Mood message', moodMessage);
      return;
    }

    // check for average sleep quality over the last 10 days
    const moderateMood = combinedData.every((day) => day.value >= 5 && day.value <= 7);
    if (moderateMood) {
      setMoodMessage('Moderate Sleep (10+ nights): Encourage exploration of activities that can enhance mood, like creative hobbies or social engagement.');
      console.log('Mood message', moodMessage);
      return;
    }

    // check for good sleep quality over the last 5 days
    const highMood = combinedData.slice(-5).every((day) => day.value >= 8);
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

    // check for poor sleep quality over the last 5 days
    const poorSleep = combinedData.slice(-5).every((day) => day.value >= 1 && day.value <= 4);
    console.log('sleep combinedData.slice(-5): ', combinedData.slice(-5));
    if (poorSleep) {
      setSleepMessage('Poor Sleep Quality (5+ nights): Offer sleep hygiene tips, relaxation techniques before bed, and suggest limiting screen time in the evening.');
      console.log('Sleep message', sleepMessage);
      return;
    }

    // check for average sleep quality over the last 10 days
    const averageSleep = combinedData.every((day) => day.value >= 5 && day.value <= 7);
    if (averageSleep) {
      setSleepMessage('Average Sleep Quality (10+ nights): Suggest fine-tuning sleep environment or routine, exploring relaxation methods like meditation.');
      console.log('Sleep message', sleepMessage);
      return;
    }

    // check for good sleep quality over the last 5 days
    const goodSleep = combinedData.slice(-5).every((day) => day.value >= 8);
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

    // check for consistently low energy over the last 5 days
    const lowEnergy = combinedData.slice(-5).every((day) => day.level === 'Low');
    if (lowEnergy) {
      setEnergyMessage('Consistently Low Energy (5+ days): Suggest reviewing diet and physical activity levels, offer strategies for managing stress, and consider recommending a health check-up if persistent.');
      return;
    }

    // check for moderate energy over the last 10 days
    const moderateEnergy = combinedData.slice(-10).every((day) => day.level === 'Moderate');
    if (moderateEnergy) {
      setEnergyMessage('Moderate Energy (10+ days): Encourage activities that naturally boost energy, such as short, brisk walks, hydration, and balanced meals.');
      return;
    }

    // check for consistently high energy over the last 5 days
    const highEnergy = combinedData.slice(-5).every((day) => day.level === 'High');
    if (highEnergy) {
      setEnergyMessage('Consistently High Energy (5+ days): Suggest channeling this energy into productive activities, like exercise, hobbies, or social projects.');
      return;
    }
    // delete this later:
    console.log('No specific energy level pattern detected. Continue monitoring.');
    setEnergyMessage(null);
  }

  useEffect(() => {
    if (currentPeriodWater.length && lastPeriodWater.length) {
      analyzeMood(currentPeriodWater, lastPeriodWater);
    }
  }, [currentPeriodWater, lastPeriodWater]);

  useEffect(() => {
    if (currentPeriodSleep.length && lastPeriodSleep.length) {
      analyzeSleepQuality(currentPeriodSleep, lastPeriodSleep);
    }
  }, [currentPeriodSleep, lastPeriodSleep]);

  // uncomment this once we have the data for energy levels
  // (energy levels should be string data, not #s)
  // useEffect(() => {
  //   if (currentPeriodWater.length && lastPeriodWater.length) {
  //     analyzeEnergyLevels(currentPeriodWater, lastPeriodWater);
  //   }
  // }, [currentPeriodWater, lastPeriodWater]);

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
                    source={require('../../assets/images/little-guy-notif.png')}
                    style={styles.infoImage}
                  />
                </TouchableOpacity>
              </View>
            )
            : null}
        </View>
        <TrendSection header="Energy Levels" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." data={lastPeriodWater} data2={currentPeriodWater} avg={avgWaterPercentage} />
        <View style={{ marginBottom: 75 }}>
          <TrendSection header="Sleep Quality" description="Discovering how mood and sleep intertwine offers valuable insights for a healthier, happier you." data={lastPeriodSleep} data2={currentPeriodSleep} avg={avgSleepPercentage} moodMessage={moodMessage} sleepMessage={sleepMessage} energyMessage={energyMessage} />
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
