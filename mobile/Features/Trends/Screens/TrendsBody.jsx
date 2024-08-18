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
import LookingForward from '../Components/lookingForward';
import styles from './TrendsPageStyles';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

// mood, sleep, energy
function TrendSection({
  header, name, description, data, data2, avg, notEnoughData, period,
}) {
  let result = '';
  if (avg < 0) {
    result = `${Math.round(avg) * -1}% decrease `;
  } else {
    result = `${Math.round(avg)}% increase `;
  }

  console.log(header, "data: ", data);
  console.log(header, "data2: ", data2);

  console.log("PERIOD: ", period);
  
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
    >
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <Text style={{ fontSize: 14, marginBottom: -100 }}>{description}</Text>
      <LineChart
        style={{ backgroundColor: 'black' }}
        data2={data2}
        data={data}
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
        spacing={period == 'Month' ? 11 : undefined}
        xAxisLabelTextStyle={{ fontSize: 8.5 }} 
      />
      {notEnoughData ? null : (
        <Text>
          Your <Text style={{ color: '#82ad98' }}>{name}</Text> trended a
          {' '}
          <Text style={{ color: '#82ad98' }}>{result}</Text>
          {avg < 0 ? 'downward' : 'upward'}
          {' '}
          from the previous week.
        </Text>
      )}
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
      isDummy: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  data2: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      sDummy: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  avg: PropTypes.number.isRequired,
};

export default function TrendsBody({ route, navigation }) {
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
  const [notEnoughData, setNotEnoughData] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [top5Values, setTop5Values] = useState([]);

  const { title } = route.params;

  const { email, id, authHeader } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserTimeSeries = async () => {
      try {
        const current = new Date();
        const start = new Date(current);
        const mid = new Date(current);
        const end = new Date(current);
        if (selectedPeriod === 'Week') {
          start.setDate(current.getDate() - 13);
          mid.setDate(current.getDate() - 7);
        } else {
          start.setDate(current.getDate() - 60);
          mid.setDate(current.getDate() - 30);
        }

        const startDate = start.toISOString();
        const midDate = mid.toISOString();
        const endDate = end.toISOString();

        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/timeSerie/getUserTimeSeries`, {
          //THE EMAIL AND USERID HERE ARE JUST FOR TESTING. need to change to just email and userId with no colon
          //email,
          //userID,
          email,
          userId: id,
          startDate,
          midDate,
          endDate,
          period: selectedPeriod,
        }, { headers: authHeader });

        setTop5Values(res.data.top5Values);

        if (res.data.message) {
          setNotEnoughData(true);
        }

        const {
          PercentageAvgMood = 0,
          PercentageAvgSleep = 0,
          PercentageAvgEnergy = 0,
          firstPeriod,
          secondPeriod,
        } = res.data;

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
  }, [selectedPeriod]);

  //NOTE!!! i changed the values for the algos to be 1 and 2 are low, 3 is moderate, and 4 and 5 is high
  //!!!

  function analyzeMood(currentData, lastData) {
    // combine both datasets to handle a 10-day span
    const totalEntries = 10;
    const combinedData = lastData.concat(currentData).filter(item => !item.isDummy).slice(-totalEntries);

    // Sort combined data by date
    const sortedCombinedData = combinedData.sort((a, b) => new Date(a.label) - new Date(b.label));
    // Log sorted combined data for debugging
    console.log('energy sortedCombinedData:', sortedCombinedData);
    // Get the most recent 5 entries
    const recentFiveEntries = sortedCombinedData.slice(-5);
    // Log the most recent 5 entries for debugging
    console.log('energy recentFiveEntries:', recentFiveEntries);

    // check for low mood levels over the last 5 days
    const lowMood = recentFiveEntries.every((day) => day.value >= 1 && day.value <= 2);
    if (lowMood) {
      setMoodMessage('We noticed your mood levels have been consistently low for 5+ days. Please feel free to use our resources or reach out for help!');
      console.log('Mood message', moodMessage);
      return;
    }

    // check for average mood levels over the last 10 days
    const moderateMood = sortedCombinedData.every((day) => day.value == 3);
    if (moderateMood) {
      setMoodMessage('We noticed your mood levels have been consistently moderate for 10+ days.');
      console.log('Mood message', moodMessage);
      return;
    }

    // check for good mood levels over the last 5 days
    const highMood = recentFiveEntries.every((day) => day.value >= 4 && day.value <= 5);
    if (highMood) {
      setMoodMessage('We noticed your mood levels have been consistently high for 5+ days!');
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
    const combinedData = lastData.concat(currentData).filter(item => !item.isDummy).slice(-totalEntries);

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
      setSleepMessage('We noticed your sleep quality has been consistently low for 5+ nights. Please feel free to use our resources or reach out for help!');
      console.log('Sleep message', sleepMessage);
      return;
    }

    // check for average sleep quality over the last 10 days
    const averageSleep = sortedCombinedData.every((day) => day.value == 3);
    if (averageSleep) {
      setSleepMessage('We noticed your sleep quality has been consistently average for 10+ nights.');
      console.log('Sleep message', sleepMessage);
      return;
    }

    // check for good sleep quality over the last 5 days
    const goodSleep = recentFiveEntries.every((day) => day.value >= 4 && day.value <= 5);
    if (goodSleep) {
      setSleepMessage('We noticed your sleep quality has been consistently high for 5+ nights!');
      console.log('Sleep message', sleepMessage);
      return;
    }
    // delete this later:
    console.log('No specific sleep quality pattern detected. Continue monitoring.');
    setSleepMessage(null);
  }

  function analyzeEnergyLevels(currentData, lastData) {
  
    // combine both datasets to handle a 10-day span
    const totalEntries = 10;
    const combinedData = lastData.concat(currentData).filter(item => !item.isDummy).slice(-totalEntries);

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
      setEnergyMessage('We noticed your energy levels have been consistently low for 5+ days. Please feel free to use our resources or reach out for help!');
      console.log('Energy message', energyMessage);
      return;
    }

    // check for moderate energy over the last 10 days
    const moderateEnergy = sortedCombinedData.every((day) => day.value == 3);
    if (moderateEnergy) {
      setEnergyMessage('We noticed your energy levels have been consistently moderate for 10+ days.');
      console.log('Energy message', energyMessage);
      return;
    }

    // check for consistently high energy over the last 5 days
    const highEnergy = recentFiveEntries.every((day) => day.value >= 4 && day.value <= 5);
    if (highEnergy) {
      setEnergyMessage('We noticed your energy levels have been consistently high for 5+ days!');
      console.log('Energy message', energyMessage);
      return;
    }
    // delete this later:
    console.log('No specific energy level pattern detected. Continue monitoring.');
    setEnergyMessage(null);
  }

  useEffect(() => {
    if (currentPeriodMood.length && lastPeriodMood.length && !notEnoughData) {
      analyzeMood(currentPeriodMood, lastPeriodMood);
    }
  }, [currentPeriodMood, lastPeriodMood]);

  useEffect(() => {
    if (currentPeriodSleep.length && lastPeriodSleep.length && !notEnoughData) {
      analyzeSleepQuality(currentPeriodSleep, lastPeriodSleep);
    }
  }, [currentPeriodSleep, lastPeriodSleep]);

  // (energy levels should be string data, not #s)
  useEffect(() => {
    if (currentPeriodEnergy.length && lastPeriodEnergy.length && !notEnoughData) {
      analyzeEnergyLevels(currentPeriodEnergy, lastPeriodEnergy);
    }
  }, [currentPeriodEnergy, lastPeriodEnergy]);


  const [modalVisible, setModalVisible] = useState(false);

  const handleTrendPress = () => {
    setModalVisible(true);
  };

  const onFindHelpPress = () => {
    navigation.navigate('FindHelp');
    setModalVisible(!modalVisible);
  }
  return (
    <ScrollView>
      <LinearGradient colors={['#E0F1F3', '#E5F8F3']} style={{ gap: 35, paddingTop: 50, paddingHorizontal: 30 }}>
        <TrendsHeader title={title} setSelectedPeriod={setSelectedPeriod} selectedPeriod={selectedPeriod}/>
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
                <View style={{alignItems: 'flex-start'}}>
                  <Text style={{marginBottom: 10}}>{moodMessage}</Text>
                  <Text style={{marginBottom: 10}}>{sleepMessage}</Text>
                  <Text style={{marginBottom: 10}}>{energyMessage}</Text>
                </View>
                <TouchableOpacity style={styles.findHelpButton} onPress={onFindHelpPress}>
                  <Text style={styles.textStyle}>Find Help</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          { !notEnoughData && (moodMessage || sleepMessage || energyMessage)
            ? (
              // <View style={{ flexDirection: 'row' }}>
              //   <Text style={{ flexShrink: 1 }}>
              //     We noticed some changes in your activity data in the past week!
              //   </Text>
              //   <TouchableOpacity onPress={handleTrendPress}>
              //     <Image
              //       source={require('../../../assets/images/little-guy-notif.png')}
              //       style={styles.infoImage}
              //     />
              //   </TouchableOpacity>
              // </View>
              <TouchableOpacity onPress={handleTrendPress}>
                <Image
                  source={require('../../../assets/images/little-guy-notif.png')}
                  style={styles.infoImage}
                />
              </TouchableOpacity>
            )
            : null}
          { notEnoughData && <Text>You don't have enough check-in data to display your trends. Keep checking in consistently!</Text> }
        </View>
        <View>
          <TrendSection header="Mood Levels" name="mood levels" description="Tracking mood changes over time" data={lastPeriodMood} data2={currentPeriodMood} avg={avgMoodPercentage} notEnoughData={notEnoughData} period={selectedPeriod}/>
        </View>
        <TrendSection header="Sleep Quality" name="sleep quality" description="Monitoring sleep patterns and quality." data={lastPeriodSleep} data2={currentPeriodSleep} avg={avgSleepPercentage} notEnoughData={notEnoughData} period={selectedPeriod}/>
        <LookingForward top5Values={top5Values}/>
        <View style={{ marginBottom: 75 }}>
        <TrendSection header="Energy Levels" name="energy levels" description="Observing energy levels throughout the day." data={lastPeriodEnergy} data2={currentPeriodEnergy} avg={avgEnergyPercentage} notEnoughData={notEnoughData} period={selectedPeriod}/>
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
