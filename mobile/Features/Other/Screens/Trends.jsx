import { useState } from 'react';
import { Button, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { BarChart, LineChart } from 'react-native-gifted-charts';

export default function Trends() {
  // dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('week');
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
      return `this ${value}.`;
    } if (weekDisplay === -1) {
      return `last ${value}.`;
    }
    return `${Math.abs(weekDisplay)} ${value}s ago.`;
  };

  /* State Variable for Data Visualization */
  const data = [
    {
      value: 10,
      timestamp: '2023-10-24T00:41:59.057Z',
    },
    {
      value: 11,
      timestamp: '2023-10-23T00:41:59.057Z',
    },
    {
      value: 12,
      timestamp: '2023-10-23T00:41:59.057Z',
    },
    {
      value: 13,
      timestamp: '2023-10-23T00:41:59.057Z',
    },
    {
      value: 14,
      timestamp: '2023-10-23T00:41:59.057Z',
    }];
  /* Bar Data for Data Visualization */
  const barData = [
    {
      value: 230,
      label: 'Jan',
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
    },
    {
      value: 180,
      label: 'Feb',
      frontColor: '#79C3DB',
      sideColor: '#68BCD7',
      topColor: '#9FD4E5',
    },
    {
      value: 195,
      label: 'Mar',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 250,
      label: 'Apr',
      frontColor: '#4ADDBA',
      sideColor: '#36D9B2',
      topColor: '#7DE7CE',
    },
    {
      value: 320,
      label: 'May',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
    }];

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
      <Text>
        your tendencies in this past
        {' '}
        {value}
      </Text>
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
      <View>
        <BarChart
          showFractionalValue
          showYAxisIndices
          hideRules
          noOfSections={4}
          maxValue={400}
          data={barData}
          barWidth={40}
          sideWidth={15}
          isThreeD
          side="right"
        />
      </View>
      <View>
        <LineChart
          data={data}
          width={300}
          height={300}
        />
      </View>
    </View>
  );
}
