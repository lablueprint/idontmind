import { useState, useEffect, useRef } from 'react';
import {
  Text, View, Button, Platform, Image, Pressable,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-switch';
import axios from 'axios';
import left from '../../assets/images/left.png';

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
    gap: 22,
  },
});

export default function NotificationsTest() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);

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

  function scheduleRandomNotification(delayInSeconds, message) {
    Notifications.scheduleNotificationAsync({
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
  }

  // Handle Toggle Change
  const handleToggleChange = async () => {
    await cancelAllScheduledNotifications();
    if (isEnabled) scheduleRandomNotification(5, 'Time for your water intake!');
    if (isEnabled2) scheduleRandomNotification(7, "Don't forget your full meal!");
    if (isEnabled3) scheduleRandomNotification(9, 'Time for some physical activity!');
    if (isEnabled4) scheduleRandomNotification(11, 'Engage in a mood-boosting activity!');
    if (isEnabled5) scheduleRandomNotification(13, 'Engage in a wellness-boosting activity!');
    if (isEnabled6) scheduleRandomNotification(15, 'Continue your thirty-day detox!');
  };

  const toggleWaterIntake = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const toggleFullMeal = () => {
    setIsEnabled2((previousState) => !previousState);
  };

  const togglePhysicalActivity = () => {
    setIsEnabled3((previousState) => !previousState);
  };

  const toggleMoodBoostingActivity = () => {
    setIsEnabled4((previousState) => !previousState);
  };

  const toggleWellnessBoostingActivity = () => {
    setIsEnabled5((previousState) => !previousState);
  };

  const toggleThirtyDayDetox = () => {
    setIsEnabled6((previousState) => !previousState);
  };

  useEffect(() => {
    handleToggleChange();
  }, [isEnabled, isEnabled2, isEnabled3, isEnabled4, isEnabled5, isEnabled6]);

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

  const enableAllToggles = () => {
    setIsEnabled(true);
    setIsEnabled2(true);
    setIsEnabled3(true);
    setIsEnabled4(true);
    setIsEnabled5(true);
    setIsEnabled6(true);
  };

  const disableAllToggles = () => {
    setIsEnabled(false);
    setIsEnabled2(false);
    setIsEnabled3(false);
    setIsEnabled4(false);
    setIsEnabled5(false);
    setIsEnabled6(false);
  };
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
      // alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  // schedules push notification infinitely
  async function schedulePushNotification(title, body) {
    try {
      // const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getAllUsers`); // replace with get user by _id route
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

  return (
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
            Morning, 8:15am
          </Text>
          <Switch
            backgroundActive="#404040"
            backgroundInactive="#53504C33"
            activeText=""
            inActiveText=""
            value={null}
            onValueChange={() => {}}
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
      <View style={styles.allToggleContainers}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleContainerText}>
            Water Intake
          </Text>
          <Switch
            backgroundActive="#404040"
            backgroundInactive="#53504C33"
            activeText=""
            inActiveText=""
            value={isEnabled}
            onValueChange={toggleWaterIntake}
            barHeight={24}
            circleSize={20}
            switchWidthMultiplier={2.6}
            circleBorderWidth={0}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleContainerText}>
            Full Meal
          </Text>
          <Switch
            backgroundActive="#404040"
            backgroundInactive="#53504C33"
            activeText=""
            inActiveText=""
            value={isEnabled2}
            onValueChange={toggleFullMeal}
            barHeight={24}
            circleSize={20}
            switchWidthMultiplier={2.6}
            circleBorderWidth={0}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleContainerText}>
            Physical Activity
          </Text>
          <Switch
            backgroundActive="#404040"
            backgroundInactive="#53504C33"
            activeText=""
            inActiveText=""
            value={isEnabled3}
            onValueChange={togglePhysicalActivity}
            barHeight={24}
            circleSize={20}
            switchWidthMultiplier={2.6}
            circleBorderWidth={0}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleContainerText}>
            Mood-Boosting Activity
          </Text>
          <Switch
            backgroundActive="#404040"
            backgroundInactive="#53504C33"
            activeText=""
            inActiveText=""
            value={isEnabled4}
            onValueChange={toggleMoodBoostingActivity}
            barHeight={24}
            circleSize={20}
            switchWidthMultiplier={2.6}
            circleBorderWidth={0}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleContainerText}>
            Wellness-Boosting Activity
          </Text>
          <Switch
            backgroundActive="#404040"
            backgroundInactive="#53504C33"
            activeText=""
            inActiveText=""
            value={isEnabled5}
            onValueChange={toggleWellnessBoostingActivity}
            barHeight={24}
            circleSize={20}
            switchWidthMultiplier={2.6}
            circleBorderWidth={0}
          />
        </View>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleContainerText}>
            Thirty Day Detox
          </Text>
          <Switch
            backgroundActive="#404040"
            backgroundInactive="#53504C33"
            activeText=""
            inActiveText=""
            value={isEnabled6}
            onValueChange={toggleThirtyDayDetox}
            barHeight={24}
            circleSize={20}
            switchWidthMultiplier={2.6}
            circleBorderWidth={0}
          />
        </View>
      </View>
      <Text>
        Your expo push token:
        {' '}
        {expoPushToken}
      </Text>
    </LinearGradient>
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
