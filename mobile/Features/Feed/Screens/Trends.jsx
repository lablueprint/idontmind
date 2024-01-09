import { Button, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Trends() {
  const [isWeek, setIsWeek] = useState(True);

  const [items, setItems] = useState([
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
  ]);

  return (
    <View>
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{ width: '90%', alignSelf: 'center' }}
      drop

      />
    </View>
  );
}
