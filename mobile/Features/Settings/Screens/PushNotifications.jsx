import {
  Pressable, Text, View, TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Divider } from '@rneui/themed';
import { Switch } from 'react-native-switch';
import DropDownPicker from 'react-native-dropdown-picker';
import { TimerPickerModal } from 'react-native-timer-picker';
import { LinearGradient } from 'expo-linear-gradient';
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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    { label: 'weekly', value: 'weekly' },
    { label: 'daily', value: 'daily' },
    { label: 'monthly', value: 'monthly' },
  ]);

  function onDisplayNotification() {
    console.log(2);
  }
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState(null);

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
          DAILY CHECK-IN
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
            onConfirm={(pickedDuration) => {
              setAlarmString(formatTime(pickedDuration));
              setShowPicker(false);
            }}
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
          CATEGORY
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
              value={isEnabled}
              onValueChange={toggleSwitch}
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
              value={isEnabled2}
              onValueChange={toggleSwitch2}
              barHeight={24}
              circleSize={22}
              switchWidthMultiplier={2.3}
              circleBorderWidth={0}
            />
          </View>
        </View>
        <Text style={[styles.category, { marginTop: '9%', marginBottom: '4%' }]}>
          CATEGORY
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
    </View>
  );
}

export default PushNotifications;
