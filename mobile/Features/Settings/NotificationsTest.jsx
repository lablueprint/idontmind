import { useState, useEffect, useRef } from 'react';
import {
  Text, View, Platform, Image, Pressable, Modal, StyleSheet, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-switch';
import { useSelector } from 'react-redux';
import axios from 'axios';
import WheelPicker from 'react-native-wheely';
import ToggleSwitch from './Components/ToggleSwitch';
import left from '../../assets/images/left.png';
import cancelImage from '../../assets/images/cancel.png';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 25,
    gap: 30,
  },
  header: {
    flexDirection: 'column',
    marginTop: '20%',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 500,
    letterSpacing: -1.6,
  },
  headerOptions: {
    fontSize: 14,
    marginBottom: 10,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  bellIcon: {
    height: 48,
    width: 48,
  },
  leftIcon: {
    height: 15,
    width: 15,
  },
  subSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  subSectionHeader: {
    fontSize: 21,
    zIndex: 2,
  },
  subSectionText: {
    fontSize: 15,
    letterSpacing: -0.5,
    color: '#929999',
  },
  setDefaultButton: {
    borderRadius: 99,
    width: '45%',
    backgroundColor: '#C6CECE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  saveButton: {
    borderRadius: 99,
    width: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  setDefaultText: {
    fontSize: 14,
  },
  saveText: {
    fontSize: 14,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: '10%',
    width: '92%',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  toggleContainerText: {
    color: '#26292E99',
  },
  allToggleContainers: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textAlignLeft: {
    textAlign: 'left',
    alignSelf: 'stretch', // Ensures the text takes up full width for left alignment
  },
  timeText: {
    marginTop: 15,
  },
  pText: {
    marginBottom: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#929999',
    marginVertical: 15,
  },
  modalHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cancelImage: {
    marginRight: 3,
    height: 25,
    width: 25,
    alignSelf: 'flex-start',
  },
});

export default function NotificationsTest() {
  const { id, authHeader } = useSelector((state) => state.auth);
  const [expoPushToken, setExpoPushToken] = useState('');
  const responseListener = useRef();
  const navigation = useNavigation();
  const [checkIn, setCheckIn] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [reminderSet, setReminderSet] = useState(new Set());
  const allLabels = ['Water Intake', 'Full Meal', 'Physical Activity', 'Mood-Boosting Activity', 'Wellness-Boosting Activity', 'Thirty Day Detox'];
  const notificationMessages = [
    'Time for your water intake!',
    "Don't forget your full meal!",
    'Time for some physical activity!',
    'Engage in a mood-boosting activity!',
    'Engage in a wellness-boosting activity!',
    'Continue your thirty-day detox!',
  ];

  const identifierMap = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  };

  const cancelAllScheduledNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling scheduled notifications:', error);
    }
  };

  function getRandomTime() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
    const timeUntilTomorrow = tomorrow.getTime() - now.getTime();
    return timeUntilTomorrow / 1000; // to seconds
  }

  async function scheduleRandomNotification(delayInSeconds, message, number) {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Don't forget!",
        body: message,
        data: { withSome: 'data' },
      },
      trigger: {
        seconds: delayInSeconds,
        repeats: false, // Set to true if you want it to repeat at the same time every day
      },
    });
    identifierMap[number] = identifier;
  }

  function cancelRandomNotification(number) {
    Notifications.cancelScheduledNotificationAsync(identifierMap[number]);
  }

  const handleCheckIn = async () => {
    if (checkIn) {
      setShowPicker(false);
    } else {
      setShowPicker(true);
    }
    const newPref = !checkIn;
    setCheckIn(newPref);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { checkInPreference: newPref } }, { headers: authHeader });
  };

  const toggleSwitch = async (label) => {
    const labelIndex = allLabels.indexOf(label) + 1;
    const temp = new Set(reminderSet);
    if (reminderSet.has(label)) {
      temp.delete(label);
      setReminderSet(temp);
      cancelRandomNotification(labelIndex);
    } else {
      temp.add(label);
      setReminderSet(temp);
      const randomDelay = Math.floor(Math.random() * 10) + 1;
      scheduleRandomNotification(randomDelay, notificationMessages[labelIndex - 1], labelIndex);
    }
    const reminderArray = Array.from(temp);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { 'pushNotifs.reminders': reminderArray } }, { headers: authHeader });
  };

  const enableAllToggles = async () => {
    const newSet = new Set(reminderSet);
    allLabels.forEach((label) => {
      newSet.add(label);
      const randomDelay = Math.floor(Math.random() * 10) + 1;
      const labelIndex = allLabels.indexOf(label) + 1;
      scheduleRandomNotification(randomDelay, notificationMessages[labelIndex - 1], labelIndex);
    });
    setReminderSet(newSet);
    const reminderArray = Array.from(newSet);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { 'pushNotifs.reminders': reminderArray } }, { headers: authHeader });
  };

  const disableAllToggles = async () => {
    const newSet = new Set(reminderSet);
    allLabels.forEach((label) => {
      newSet.delete(label);
      const labelIndex = allLabels.indexOf(label) + 1;
      cancelRandomNotification(labelIndex);
    });
    setReminderSet(newSet);
    const reminderArray = Array.from(newSet);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { 'pushNotifs.reminders': reminderArray } }, { headers: authHeader });
  };

  /*
    Plan:
      - pull user id from redux
      - Axios to pull "dailyReminderTime (timestamp)" and "reminderFrequency (string)" from mongoDB
      - Have a bunch of if statements:
        - If reminderFrequency === "daily":
          - Set time to send notification to "dailyReminderTime" and make it send every day
  */

  // get time from database -> say it is 5:15 PM
  // right now it is 8:44AM

  // get time to 5:15PM -->

  // asks user for permission and generates token for user
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: '3336f63f-0aa8-4dd9-91ce-12da7281d317' })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  // schedules push notification infinitely
  async function schedulePushNotification(title, body) {
    try {
      // const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getAllUsers`);
      // replace with get user by _id route
      // set the dailyReminder time and reminder frequency in variables
      // let dailyReminderTime = data.body.dailyReminderTime
      // let reminderFrequency = data.body.dataFrequency

      const hardcodedDate = new Date('2024-04-03T8:30:00'); // Set your desired date and time

      const nextNotificationTime = new Date(hardcodedDate);
      nextNotificationTime.setDate(hardcodedDate.getDate() + 7); // Add 7 days for weekly schedule

      // Calculate the difference between now and the next notification time
      // const now = new Date();
      // const timeDifference = nextNotificationTime.getTime() - now.getTime();

      const nextTime = nextNotificationTime;

      console.log('Next weekly reminder:', nextNotificationTime.toLocaleString());

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { data: 'goes here' },
        },
        trigger: {
          seconds: nextTime / 1000, // Convert milliseconds to seconds
          repeats: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  // sends on button press
  const sendPushNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        host: 'exp.host',
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log('token: ', token);
      setExpoPushToken(token);
    });

    // called when user clicks on a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      navigation.navigate('Login');
      console.log(response);
    });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => {
    const value = i * 5;
    return value < 10 ? `0${value}` : `${value}`;
  });
  const day = ['am', 'pm'];

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const setDailyNotif = async () => {
    setShowPicker(false);
    setCheckIn(true);
    // set the alarm
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { 'pushNotifs.time': { hours: selectedHour, minutes: selectedMinute, day: selectedDay } } }, { headers: authHeader });
  };

  // get push notification data from user
  const fetchData = async () => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/readSpecifiedFields`, { id, fields: ['pushNotifs', 'checkInPreference'] }, { headers: authHeader });
    return res;
  };

  const getTimeOfDay = () => {
    const hour = parseInt(hours[selectedHour], 10);
    if (selectedDay === 0) { // AM
      if (hour === 12 || hour <= 11) {
        return 'Morning';
      }
    } else { // PM
      if (hour === 12 || (hour >= 0 && hour <= 4)) {
        return 'Afternoon';
      }
      return 'Evening';
    }
    return 'Evening';
  };

  useEffect(() => {
    fetchData().then((res) => {
      const { pushNotifs, checkInPreference } = res.data;
      setSelectedHour(pushNotifs.time.hours);
      setSelectedMinute(pushNotifs.time.minutes);
      setSelectedDay(pushNotifs.time.day);
      const temp = new Set(pushNotifs.reminders);
      setReminderSet(temp);
      setCheckIn(checkInPreference);
    });
  }, []);

  return (
    <ScrollView>
      <LinearGradient colors={['#E0F1F3', '#E5F8F3']} style={[styles.mainContainer]}>
        <View style={[styles.header]}>
          <View style={[styles.headerTitle, { gap: 10 }]}>
            <Image
              source={left}
              style={[styles.leftIcon]}
            />
            <Text style={[styles.headerOptions]}>
              OPTIONS
            </Text>
          </View>
          <View style={[styles.headerTitle]}>
            <Text style={[styles.headerText]}>
              Push Notifications
            </Text>
            <Image
              source={require('../../assets/SMASHTHATBELL.png')}
              style={[styles.bellIcon]}
            />
          </View>
        </View>
        <View style={[styles.subSection]}>
          <View>
            <Text style={[styles.subSectionHeader]}>
              Daily Check-In
            </Text>
            <View style={{
              position: 'absolute', bottom: 3, width: '42%', height: '60%', backgroundColor: '#BFDBD7',
            }}
            />
          </View>
          <Text style={[styles.subSectionText]}>
            When should we ask you about your day?
          </Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleContainerText}>
              {getTimeOfDay()}
              ,
              {' '}
              {hours[selectedHour]}
              :
              {minutes[selectedMinute]}
              {day[selectedDay]}
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="#53504C33"
              activeText=""
              inActiveText=""
              value={checkIn}
              onValueChange={handleCheckIn}
              barHeight={24}
              circleSize={20}
              switchWidthMultiplier={2.6}
              circleBorderWidth={0}
            />
          </View>
        </View>
        <View style={[styles.subSection]}>
          <View>
            <Text style={[styles.subSectionHeader]}>
              Daily Reminders
            </Text>
            <View style={{
              position: 'absolute', bottom: 3, width: '45%', height: '60%', backgroundColor: '#BFDBD7',
            }}
            />
          </View>
          <Text style={[styles.subSectionText]}>
            Feel free to toggle the option for us to randomly send a notification
            throughout the day to help remind you of certain activities.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            title="enable all notifications"
            style={styles.setDefaultButton}
            onPressIn={enableAllToggles}
          >
            <Text style={styles.setDefaultText}>Enable All</Text>
          </Pressable>
          <LinearGradient
            colors={['#374342', '#546967']}
            style={styles.saveButton}
          >
            <Pressable
              title="disable all notifications"
              onPressIn={disableAllToggles}
            >
              <Text style={styles.saveText}>Disable All</Text>
            </Pressable>
          </LinearGradient>
        </View>
        <Modal
          animationType="slide"
          transparent
          visible={showPicker}
        >
          <View style={styles.centeredView}>
            <View style={[styles.greenbg, styles.modalView, { height: '65%' }]}>
              <View style={styles.headerRow}>
                <Text style={[styles.modalHeader, styles.textAlignLeft]}>
                  Check-In
                </Text>
                <Pressable
                  onPress={() => { setShowPicker(false); setCheckIn(false); }}
                >
                  <Image
                    style={styles.cancelImage}
                    source={cancelImage}
                  />
                </Pressable>
              </View>
              <Text style={[styles.textAlignLeft, styles.timeText]}>
                {hours[selectedHour]}
                :
                {minutes[selectedMinute]}
                {day[selectedDay]}
              </Text>
              <View style={styles.line} />
              <Text style={[styles.textAlignLeft, styles.subSectionHeader]}>Surprise Me!</Text>
              <Text style={[styles.subSectionText, styles.textAlignLeft, styles.pText]}>
                Receive a notification at a random time during the day.
              </Text>
              <Text style={[styles.subSectionHeader, styles.modalText, styles.textAlignLeft]}>
                Set a time.
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <WheelPicker
                  style={{ flex: 1 }}
                  selectedIndex={selectedHour}
                  options={hours}
                  onChange={(index) => setSelectedHour(index)}
                />
                <WheelPicker
                  style={{ flex: 1 }}
                  selectedIndex={selectedMinute}
                  options={minutes}
                  onChange={(index) => setSelectedMinute(index)}
                />
                <WheelPicker
                  style={{ flex: 1 }}
                  selectedIndex={selectedDay}
                  options={day}
                  onChange={(index) => setSelectedDay(index)}
                />
              </View>
              <LinearGradient
                colors={['#374342', '#546967']}
                style={styles.saveButton}
              >
                <Pressable
                  title="set reminder"
                  onPressIn={setDailyNotif}
                >
                  <Text style={styles.saveText}>Set Reminder</Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        </Modal>
        <View style={styles.allToggleContainers}>
          <ToggleSwitch label="Water Intake" value={reminderSet.has(allLabels[0])} onValueChange={toggleSwitch} />
          <ToggleSwitch label="Full Meal" value={reminderSet.has(allLabels[1])} onValueChange={toggleSwitch} />
          <ToggleSwitch label="Physical Activity" value={reminderSet.has(allLabels[2])} onValueChange={toggleSwitch} />
          <ToggleSwitch label="Mood-Boosting Activity" value={reminderSet.has(allLabels[3])} onValueChange={toggleSwitch} />
          <ToggleSwitch label="Wellness-Boosting Activity" value={reminderSet.has(allLabels[4])} onValueChange={toggleSwitch} />
          <ToggleSwitch label="Thirty Day Detox" value={reminderSet.has(allLabels[5])} onValueChange={toggleSwitch} />
        </View>
        {/* <Text>
          Your expo push token:
          {' '}
          {expoPushToken}
        </Text> */}
      </LinearGradient>
    </ScrollView>
  );
}

// Calculate time difference for weekly reminder
// function calculateWeeklyTimeDifference(reminderHour, reminderMinute, reminderSecond) {
//   const currentTime = new Date();
//   const currentDayOfWeek = currentTime.getDay();
//   const currentHour = currentTime.getHours();
//   const currentMinute = currentTime.getMinutes();
//   const currentSecond = currentTime.getSeconds();

//   let daysUntilNextReminder = 0;
//   if (currentDayOfWeek < reminderDayOfWeek) {
//     daysUntilNextReminder = reminderDayOfWeek - currentDayOfWeek;
//   } else if (currentDayOfWeek > reminderDayOfWeek) {
//       daysUntilNextReminder = 7 - (currentDayOfWeek - reminderDayOfWeek);
//   } else {
//       if (currentHour > reminderHour || (currentHour === reminderHour && currentMinute > reminderMinute) ||
//           (currentHour === reminderHour && currentMinute === reminderMinute && currentSecond >= reminderSecond)) {
//           // If current time is after or equal to the reminder time, set reminder to next week
//           daysUntilNextReminder = 7;
//       }
//   }

//   // Calculate total time difference in seconds
//   let timeDifference = daysUntilNextReminder * 24 * 3600; // Convert days to seconds
//   timeDifference += (reminderHour - currentHour) * 3600; // Hours to seconds
//   timeDifference += (reminderMinute - currentMinute) * 60; // Minutes to seconds
//   timeDifference += reminderSecond - currentSecond; // Seconds

//   return timeDifference;
// }

// // Calculate time difference for every two weeks reminder
// function calculateTwoWeeksTimeDifference(reminderHour, reminderMinute, reminderSecond) {
//   const currentTime = new Date();
//   const currentDayOfWeek = currentTime.getDay();
//   const currentHour = currentTime.getHours();
//   const currentMinute = currentTime.getMinutes();
//   const currentSecond = currentTime.getSeconds();

//   let daysUntilNextReminder = 0;
//   if (currentDayOfWeek < reminderDayOfWeek) {
//       daysUntilNextReminder = (reminderDayOfWeek - currentDayOfWeek) + 7;
//   } else if (currentDayOfWeek > reminderDayOfWeek) {
//       daysUntilNextReminder = (14 - (currentDayOfWeek - reminderDayOfWeek));
//   } else {
//       if (currentHour > reminderHour || (currentHour === reminderHour && currentMinute > reminderMinute) ||
//           (currentHour === reminderHour && currentMinute === reminderMinute && currentSecond >= reminderSecond)) {
//           // If current time is after or equal to the reminder time, set reminder to next two weeks
//           daysUntilNextReminder = 14;
//       }
//   }

//   // Calculate total time difference in seconds
//   let timeDifference = daysUntilNextReminder * 24 * 3600; // Convert days to seconds
//   timeDifference += (reminderHour - currentHour) * 3600; // Hours to seconds
//   timeDifference += (reminderMinute - currentMinute) * 60; // Minutes to seconds
//   timeDifference += reminderSecond - currentSecond; // Seconds

//   return timeDifference;
// }
