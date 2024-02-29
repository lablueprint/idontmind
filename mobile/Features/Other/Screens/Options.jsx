import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import OptionStyle from './OptionStyle';

export default function Options({ navigation }) {
  const options = ['personal info(name, etc)', 'account info (email, pass)', 'mental health info', 'push notifications', 'content recommendations', 'check-ins'];

  const navigateFunctions = (key) => {
    if (key === 5) {
      navigation.navigate('BannedTags');
    }
  };

  return (
    <View style={OptionStyle.container}>
      <Text style={OptionStyle.title}> options </Text>
      <Text style={OptionStyle.personalData}> personal data </Text>
      {options.map((option, index) => (
        <View key={option}>
          {index === 3 && <Text style={OptionStyle.customize}> customize </Text>}
          <View style={OptionStyle.optionContainer}>
            <View style={OptionStyle.box} />
            <TouchableOpacity onPress={() => navigateFunctions(index + 1)}>
              <View style={OptionStyle.rowContainer}>
                <Text style={OptionStyle.text}>{option}</Text>
                <Text style={OptionStyle.arrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>

  );
}

Options.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
