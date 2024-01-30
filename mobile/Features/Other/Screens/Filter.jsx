import { View, Text } from 'react-native';
import FilterAndBannedTags from '../Components/FilterAndBannedTags';

export default function Filter({ navigation }) {
  return (
    <View style={{ alignItems: 'center', marginTop: 20}}>
      <Text style={{ fontSize: 36 }}> advanced filter </Text>
      <FilterAndBannedTags navigation={navigation} screenOption={1} />
    </View>
  );
}
