import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function NotificationsTest() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();

  /*
    Plan:
      - pull user id from redux 
      - Axios to pull "dailyReminderTime (timestamp)" and "reminderFrequency (string)" from mongoDB
      - Have a bunch of if statements:
        - If reminderFrequency === "daily":
          - Set time to send notification to "dailyReminderTime" and make it send every day
  */

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
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getAllUsers`); // replace with get user by _id route
      // set the dailyReminder time and reminder frequency in variables
      // let dailyReminderTime = data.body.dailyReminderTime
      // let reminderFrequency = data.body.dataFrequency

      /*
      if reminderFrequency === "weekly":
        *set seconds to the date
      */

      console.log(33, res.data);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: { data: 'goes here' },
        },
        trigger: {
          seconds: 60,
          repeats: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  // const test = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/getAllUsers`);
  //     console.log(33, res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const cancelAllScheduledNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error canceling scheduled notifications:', error);
    }
  };

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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification (Add reminder after time select)"
        onPress={async () => {
          await schedulePushNotification('New Notification', 'WOOOO');
        }}
      />
      <Button
        title="Press to send a notification"
        onPress={async () => {
          await sendPushNotification();
        }}
      />
      <Button
        title="Cancel all scheduled notifications"
        onPress={async () => {
          await cancelAllScheduledNotifications();
        }}
      />
    </View>
  );
}
