import {
  Text, View, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login } from '../../../redux/authSlice';

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
  inputBox: {
    height: 40,
    width: 300,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
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

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Used to connect with redux (current state)
  const dispatch = useDispatch();

  const navigateToPersonalInfo = () => {
    navigation.navigate('PersonalInfo');
  };

  const handleNextButton = () => {
    navigateToPersonalInfo();
  };

  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  // Checks {email}@{site}.{top-level domain}
  const isValidEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return (emailRegex.test(email));
  };

  const handleSignUp = async () => {
    try {
      if (!isValidEmail()) {
        console.error('Invalid Email Address');
        return;
      }

      // Confirms matching passwords
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      // Ensures all emails are lowercase when stored in backend
      const userEmail = email.toLowerCase();
      const userData = {
        email: userEmail,
        password,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/signup`, userData);

      if (res.data.error) {
        console.error(res.data.error);
      } else { // If sign up is successful
        const res2 = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/signin`, userData);
        // Sets current state variables for session
        dispatch(login(res2.data));
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        handleNextButton();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handles pagination dots visibility for password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handles pagination dots visibility for confirm password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToLanding} style={styles.arrowContainer}>
        <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Let&apos;s get started!</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="jeff@idontmind.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="Confirm"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="black" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.paginationContainer}>
        <View style={[styles.activePaginationDot]} />
        <View style={[styles.inactivePaginationDot]} />
        <View style={[styles.inactivePaginationDot]} />
      </View>
      <View style={styles.buttonShape}>
        <TouchableOpacity
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
