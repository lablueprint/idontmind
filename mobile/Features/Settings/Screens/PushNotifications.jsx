import {
  Pressable, Text, View, StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Divider } from '@rneui/themed';
import { Switch } from 'react-native-switch';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: '35%',
    alignSelf: 'center',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  category: {
    marginBottom: 18,
    marginTop: 12,
    fontSize: 15,
  },
  timeOfDayContainer: {
    flexDirection: 'row',
    width: '97%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  timeOfDayText: {
    fontSize: 20,
  },
  setDefaultButton: {
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  saveButton: {
    borderRadius: 8,
    width: '48%',
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  setDefaultText: {
    fontSize: 18,
  },
  saveText: {
    fontSize: 18,
    color: 'white',
  },
});

function PushNotifications() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    { label: 'weekly', value: 'weekly' },
    { label: 'daily', value: 'daily' },
    { label: 'monthly', value: 'monthly' },
  ]);

  return (
    <View>
      <Text style={styles.header}>
        Push Notifications
      </Text>
      <View style={styles.container}>
        <Divider
          width={1}
        />
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
              dropDownContainerStyle={{ borderTopWidth: 0, backgroundColor: 'white'}}
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
