import {
  Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DropdownSelect } from 'react-native-input-select';
import { setFirstNameField } from '../../../redux/authSlice';
import styles from '../Components/OnboardingStyling';

export default function PersonalInfo({ navigation }) {
  const route = useRoute();
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
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
    navigation.navigate('WOYM');
  };

  const areStatesDefaulted = () => (firstName === '' || age === '' || country === '' || gender === '');

  const notAllConditionsMet = () => {
    if (areStatesDefaulted()) {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  };

  const handleNextButton = async () => {
    try {
      if (areStatesDefaulted()) {
        console.error('Not all information selected');
        return;
      }
      const userData = {
        email,
        firstName,
        age,
        country,
        gender,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/setPersonalInfo`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      }
      dispatch(setFirstNameField({ firstName }));
      navigateToCustomization();
    } catch (e) {
      console.error('Failed to set personal information: ', e);
    }
  };

  useEffect(() => {
    notAllConditionsMet();
  }, [firstName, age, country, gender]);

  // Save last visited screen in Secure Storage
  useEffect(() => {
    const saveLastScreen = async () => {
      try {
        await SecureStore.setItemAsync('lastScreen', 'PersonalInfo');
      } catch (e) {
        console.error('unable to set screen in storage: ', e);
      }
    };

    saveLastScreen();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={navigateToSignUp} style={styles.arrowContainer}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity> */}
        <Text style={styles.title}>Tell us a bit about yourself!</Text>
        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputBox}
              placeholder="Jeff"
              value={firstName}
              onChangeText={setFirstName}
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
                keyboardType="numeric"
                maxLength={2}
                value={age}
                onChangeText={setAge}
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
            onPress={handleNextButton}
            disabled={!buttonEnabled}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

PersonalInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
