import {
  Text, View, TextInput, TouchableOpacity, StyleSheet, Image, Pressable,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DropdownSelect } from 'react-native-input-select';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Back from '../../assets/images/back.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F5F4',
    padding: 20,
    paddingTop: 100,
  },
  arrowContainer: {
    position: 'absolute',
    top: 100,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#343A3A',
    fontFamily: 'recoleta-regular',
    textAlign: 'left',
    paddingTop: 10,
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
    borderRadius: 8,

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
    fontFamily: 'cabinet-grotesk-regular',
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
  const { id, authHeader } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
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

  const handleNameChange = (input) => {
    setName(input);
  };
  const handleEmailChange = (input) => {
    setEmail(input);
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSave = async () => {
    console.log('save');

    const updatedFields = {
      firstName: name,
      email,
      age,
    };
    console.log(id);
    console.log(updatedFields);

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/updateUser`, { id, updatedFields }, { headers: authHeader });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigateToOptions = () => {
    navigation.navigate('Options');
  };

  return (
    <View style={styles.container}>
      <View style={{ borderBottomColor: '#26292E80', borderBottomWidth: 0.5, paddingBottom: 20 }}>
        <Pressable onPress={navigateToOptions}>
          <View style={{
            display: 'flex', flexDirection: 'row',
          }}
          >
            <Pressable onPress={navigateToOptions} style={{ flex: 1, alignSelf: 'flex-start' }}>
              <Image
                style={{
                  resizeMode: 'contain', height: 20, width: 20,
                }}
                source={Back}
              />
            </Pressable>
            <Text style={{
              flex: 8, textAlign: 'left', fontSize: 18, fontFamily: 'cabinet-grotesk-bold', color: '#4A4E4E',
            }}
            >
              OPTIONS
            </Text>
          </View>
        </Pressable>
        <View>
          <Text style={styles.title}>Personal Information</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="Daniel Ogura"
            value={name}
            onChangeText={handleNameChange}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="danielogura@gmail..com"
            value={email}
            onChangeText={handleEmailChange}
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
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
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
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.buttonShape}>
          <TouchableOpacity
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

PersonInfo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
