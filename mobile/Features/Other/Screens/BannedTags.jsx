import {
  View, Text, TouchableOpacity, Button,
} from 'react-native';
import FilterAndBannedTags from '../Components/FilterAndBannedTags';
import FilterAndBannedTagsStyle from '../Components/FilterAndBannedTagsStyle'

export default function BannedTags({navigation}) {
  return (
    <View style={{ alignItems: 'center', marginTop: 20, padding: 10}}>
      <Text style={{fontSize: 24, marginBottom: 10}}> content recommendations </Text>
      <Text>
        select any tags that you would prefer to not have content
        recommended to you for.
      </Text>
      <FilterAndBannedTags navigation={navigation} optionScreen={2} />
    </View>
  );
}
