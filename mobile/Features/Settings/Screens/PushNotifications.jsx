import {
  Text, View, TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Divider } from '@rneui/themed';
import { Switch } from 'react-native-switch';
import { TimerPickerModal } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import styles from './PushNotificationsStyle';

function PushNotifications() {
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);

  const toggleNotif = () => setNotifEnabled((previousState) => !previousState);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const toggleSwitch4 = () => setIsEnabled4((previousState) => !previousState);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    { label: 'weekly', value: 'weekly' },
    { label: 'daily', value: 'daily' },
    { label: 'monthly', value: 'monthly' },
  ]);

  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState(null);

  const formatTime = (pickedDuration) => {
    let { hours } = pickedDuration;
    const { minutes } = pickedDuration;
    let part = 'AM';
    if (hours > 12) {
      hours -= 12;
      part = 'PM';
    }
    if (minutes === 0) {
      return `${hours}:00${part}`;
    }
    return `${hours}:${minutes}${part}`;
  };

  const setDailyNotif = (pickedDuration) => {
    setAlarmString(formatTime(pickedDuration));
    setShowPicker(false);
    // set the alarm
    axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { pushNotifs: { time: pickedDuration } }).then((res) => res);
  };

  const fetchDailyNotif = async () => {
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/readSpecifiedFields`, { id:  });
  };

  const fetchReminders = async () => {

  };

  useEffect(async () => {
    await fetchDailyNotif();
    await fetchReminders();
  }, []);

  return (
    <View>
      <Text style={styles.header}>
        Push Notifications
      </Text>
      <View style={styles.container}>
        <Divider
          width={1}
          marginBottom={25}
        />
        <Text style={[styles.category, { marginTop: '5%', marginBottom: '4%' }]}>
          Daily Check-In
        </Text>
        <Text style={{ marginBottom: 25 }}>
          When should we ask you about your day?
        </Text>
        <View>
          <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
            <Text
              style={[styles.timeOfDayText, notifEnabled
                ? styles.timeOfDayText : styles.unselected]}
            >
              {alarmString !== null
                ? alarmString
                : 'No alarm set'}
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="lightgray"
              activeText=""
              inActiveText=""
              value={notifEnabled}
              onValueChange={toggleNotif}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
        </View>
        <View style={[{ backgroundColor: '#F1F1F1', alignItems: 'center', justifyContent: 'center' },
          notifEnabled ? styles.showIt : styles.dontShowIt]}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowPicker(true)}
              >
                <View style={{ marginTop: 30 }}>
                  <Text
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 18,
                      borderWidth: 1,
                      borderRadius: 10,
                      fontSize: 16,
                      overflow: 'hidden',
                      borderColor: '#8C8C8C',
                      color: '#8C8C8C',
                    }}
                  >
                    edit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TimerPickerModal
            visible={showPicker}
            setIsVisible={setShowPicker}
            onConfirm={(pickedDuration) => setDailyNotif(pickedDuration)}
            modalTitle="Set Alarm"
            onCancel={() => setShowPicker(false)}
            closeOnOverlayPress
            use12HourPicker
            LinearGradient={LinearGradient}
            hideSeconds
            styles={{
              theme: 'light',
            }}
          />
        </View>
        <Text style={[styles.category, { marginTop: '5%', marginBottom: '4%' }]}>
          Daily Reminders
        </Text>
        <Text style={{ marginBottom: 25 }}>
          Feel free to toggle the option for us to randomly send a notification
          throughout the day to help remind you of certain activities.
        </Text>
        <View>
          <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
            <Text style={styles.timeOfDayText}>
              Water Intake
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="lightgray"
              activeText=""
              inActiveText=""
              value={isEnabled}
              onValueChange={toggleSwitch}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
          <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
            <Text style={styles.timeOfDayText}>
              Full Meal
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="lightgray"
              activeText=""
              inActiveText=""
              value={isEnabled2}
              onValueChange={toggleSwitch2}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
        </View>
        <View>
          <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
            <Text style={styles.timeOfDayText}>
              Physical Actiity
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="lightgray"
              activeText=""
              inActiveText=""
              value={isEnabled3}
              onValueChange={toggleSwitch3}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
          <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
            <Text style={styles.timeOfDayText}>
              Mood-Boosting Activity
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="lightgray"
              activeText=""
              inActiveText=""
              value={isEnabled4}
              onValueChange={toggleSwitch4}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
          <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
            <Text style={styles.timeOfDayText}>
              Wellness-Boosting Activity
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="lightgray"
              activeText=""
              inActiveText=""
              value={isEnabled4}
              onValueChange={toggleSwitch4}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
          <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
            <Text style={styles.timeOfDayText}>
              Thirty Day Detox
            </Text>
            <Switch
              backgroundActive="#404040"
              backgroundInactive="lightgray"
              activeText=""
              inActiveText=""
              value={isEnabled4}
              onValueChange={toggleSwitch4}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default PushNotifications;
