import { useState } from 'react';
import { Button, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Trends() {
  // dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
  ]);
  // -1 = last week, 0 = this week, 1 = next week, etc.
  const [weekDisplay, setWeekDisplay] = useState(0);

  // changes the week when navigating the < > buttons
  const changeWeek = (val) => {
    if (weekDisplay + val > 0) return;
    setWeekDisplay(weekDisplay + val);
  };

  // map week number to displayed text
  const getWeekText = () => {
    if (weekDisplay === 0) {
      return 'this week.';
    } if (weekDisplay === -1) {
      return 'last week';
    }
    return `${Math.abs(weekDisplay)} weeks ago`;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ width: '90%', alignSelf: 'center' }}
        dropDownContainerStyle={{ width: '90%', alignSelf: 'center' }}
      />
      <Text>trends</Text>
      <Text>your tendencies in this past week</Text>
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      }}
      >
        <Button title="<" color="black" onPress={() => changeWeek(-1)} />
        <Text>
          {getWeekText()}
        </Text>
        <Button title=">" color="black" onPress={() => changeWeek(1)} />
      </View>
    </View>
  );
}
