import { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Trends() {
  // dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
  ]);

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
    </View>
  );
}
