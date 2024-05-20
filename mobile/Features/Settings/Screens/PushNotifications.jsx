import {
  ScrollView, Text, View, TouchableOpacity, Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Divider } from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './PushNotificationsStyle';
import ToggleSwitch from '../Components/ToggleSwitch';

function PushNotifications() {
  const { id, authHeader } = useSelector((state) => state.auth);
  // to track reminders that are toggled on
  const [reminderSet, setReminderSet] = useState(new Set());
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState('');
  const [preference, setPreference] = useState(false);

  const togglePreference = async () => {
    const newPref = !preference;
    setPreference(newPref);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { checkInPreference: newPref } }, { headers: authHeader });
  };

  const toggleSwitch = async (label) => {
    const temp = new Set(reminderSet);
    if (reminderSet.has(label)) {
      temp.delete(label);
      setReminderSet(temp);
    } else {
      temp.add(label);
      setReminderSet(temp);
    }
    const reminderArray = Array.from(temp);
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { 'pushNotifs.reminders': reminderArray } }, { headers: authHeader });
  };

  const formatTime = (pickedDuration) => {
    if (!pickedDuration) return '';
    const date = new Date(pickedDuration);
    let hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    let relativeTime = 'Morning, ';
    let part = 'AM';
    if (hours > 12) {
      hours -= 12;
      part = 'PM';
      relativeTime = 'Evening, ';
    }
    if (minutes === '00') {
      return `${relativeTime}${hours}:00${part}`;
    }
    return `${relativeTime}${hours}:${minutes}${part}`;
  };

  const setDailyNotif = async (pickedDuration) => {
    setAlarmString(formatTime(pickedDuration));
    setShowPicker(false);
    // set the alarm
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields: { 'pushNotifs.time': pickedDuration } }, { headers: authHeader });
  };

  // get push notification data from user
  const fetchData = async () => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/readSpecifiedFields`, { id, fields: ['pushNotifs', 'checkInPreference'] }, { headers: authHeader });
    return res;
  };

  useEffect(() => {
    fetchData().then((res) => {
      const { pushNotifs, checkInPreference } = res.data;
      setAlarmString(formatTime(pushNotifs.time));
      const temp = new Set(pushNotifs.reminders);
      setReminderSet(temp);
      setPreference(checkInPreference);
    });
  }, []);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets>
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
        <Text>
          When should we ask you about your day?
          <ToggleSwitch label="" value={preference} onValueChange={togglePreference} />
        </Text>

        {preference && (
        <View style={[styles.timeOfDayContainer, { marginBottom: 25 }]}>
          <Text
            style={[styles.timeOfDayText, styles.timeOfDayText]}
          >
            {alarmString !== ''
              ? alarmString
              : 'No alarm set'}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.editButton}>
              edit
            </Text>
          </TouchableOpacity>
          <View>
            <DateTimePickerModal
              isVisible={showPicker}
              mode="time"
              locale="en_GB"
              onConfirm={setDailyNotif}
              onCancel={() => setShowPicker(false)}
            />
          </View>
        </View>
        )}

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
              time of day
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
          <View style={styles.timeOfDayContainer}>
            <Text style={styles.timeOfDayText}>
              time of day
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
          <Text style={[styles.category, { marginTop: '9%', marginBottom: '1%' }]}>
            CATEGORY
          </Text>
          <View style={[styles.timeOfDayContainer, { zIndex: 2 }]}>
            <Text style={styles.timeOfDayText}>
              category of reminder
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="weekly"
              showArrowIcon
              style={{ width: 105, backgroundColor: 'transparent', borderWidth: 0 }}
              containerStyle={{ width: 105, borderTopWidth: 0 }}
              dropDownContainerStyle={{ borderTopWidth: 0, backgroundColor: 'white' }}
            />
          </View>
          <View style={[styles.timeOfDayContainer, { zIndex: 1 }]}>
            <Text style={styles.timeOfDayText}>
              category of reminder
            </Text>
            <DropDownPicker
              open={open2}
              value={value2}
              items={items}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems}
              placeholder="weekly"
              showArrowIcon
              style={{ width: 105, backgroundColor: 'transparent', borderWidth: 0 }}
              containerStyle={{ width: 105, borderTopWidth: 0 }}
              dropDownContainerStyle={{ borderTopWidth: 0, backgroundColor: 'white' }}
            />
          </View>
          <View style={[styles.timeOfDayContainer, { marginTop: '7%' }]}>
            <Pressable
              title="set default"
              style={styles.setDefaultButton}
            >
              <Text style={styles.setDefaultText}>set default</Text>
            </Pressable>
            <Pressable
              title="save"
              style={styles.saveButton}
              onPressIn={onDisplayNotification}
            >
              <Text style={styles.saveText}>save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default PushNotifications;
