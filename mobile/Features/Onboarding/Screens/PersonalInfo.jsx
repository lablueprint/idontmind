import {
    Text, View, TextInput, TouchableOpacity, StyleSheet,
  } from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DropdownSelect } from 'react-native-input-select';
import styles from '../Components/OnboardingStyling';

export default function PersonInfo({ navigation }) {
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const countryItems = [  // will be replaced with all countries dataset
    { label: 'Albania', value: 'albania' },
    { label: 'Korea', value: 'korea' },
    { label: 'Japan', value: 'japan' },
    { label: 'United States', value: 'united states' },
  ];
  const genderItems = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Nonbinary', value: 'nonbinary'},
    { label: 'Other', value: 'other' },
  ];

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  }

  const navigateToCustomization = () => {
    navigation.navigate('Customization');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToSignUp} style={styles.arrowContainer}>
        <Icon name="arrow-left" size={30} color="black"/>
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
              placeholder='Select...'
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
            placeholder='Select...'
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
  )
}

PersonInfo.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};