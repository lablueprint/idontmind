import {
  Text, View, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DropdownSelect } from 'react-native-input-select';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F5F4',
  },
  arrowContainer: {
    position: 'absolute',
    top: 100,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 63,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  ageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 63,
    width: 96,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  genderTitle: {
    paddingLeft: 80,
  },
  genderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 63,
    width: 255,
    marginTop: 5,
    paddingTop: 22,
    paddingLeft: 10,
  },
  countryDropdown: {
    width: 350,
    height: 63,
    marginTop: 5,
    borderRadius: 8,
  },
  inputBox: {
    height: 40,
    width: 300,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  ageInputBox: {
    height: 40,
    width: 40,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  ageGenderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonShape: {
    backgroundColor: '#C0C0C0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    width: 258,
    height: 70,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 12,
  },
  eyeIcon: {
    marginTop: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: 62,
    justifyContent: 'center',
  },
  activePaginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'black',
  },
  inactivePaginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'gray',
  },
});

export default function PersonInfo({ navigation }) {
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const countryItems = [ // will be replaced with all countries dataset
    { label: 'Albania', value: 'albania' },
    { label: 'Korea', value: 'korea' },
    { label: 'Japan', value: 'japan' },
    { label: 'United States', value: 'united states' },
  ];
  const genderItems = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Nonbinary', value: 'nonbinary' },
    { label: 'Other', value: 'other' },
  ];

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToCustomization = () => {
    navigation.navigate('Customization');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToSignUp} style={styles.arrowContainer}>
        <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Tell us a bit about yourself!</Text>
      <View style={styles.inputContainer}>
        <Text>First Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="Jeff"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.ageGenderContainer}>
          <Text>Age</Text>
          <Text style={styles.genderTitle}>Gender</Text>
        </View>
        <View style={styles.ageGenderContainer}>
          <View style={styles.ageWrapper}>
            <TextInput
              style={styles.ageInputBox}
              placeholder="Age"
              // keyboardType="numeric" (fix exiting numberpad bug)
              maxLength={2}
            />
          </View>
          <View style={styles.genderWrapper}>
            <DropdownSelect
              placeholder="Select..."
              options={genderItems}
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Country</Text>
        <View style={styles.countryDropdown}>
          <DropdownSelect
            placeholder="Select..."
            options={countryItems}
            selectedValue={country}
            onValueChange={(value) => setCountry(value)}
            isSearchable
          />
        </View>
      </View>
      <View style={styles.paginationContainer}>
        <View style={[styles.inactivePaginationDot]} />
        <View style={[styles.activePaginationDot]} />
        <View style={[styles.inactivePaginationDot]} />
      </View>
      <View style={styles.buttonShape}>
        <TouchableOpacity
          onPress={navigateToCustomization}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

PersonInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
