import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import FilterAndBannedTags from '../Components/FilterAndBannedTags';

export default function Filter({ navigation }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: 40 }}>
      <Text style={{ fontSize: 36 }}> advanced filter </Text>
      <FilterAndBannedTags navigation={navigation} screenOption={1} />
    </View>
  );
}

Filter.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
