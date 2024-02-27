import {
    Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard
  } from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Components/OnboardingStyling'

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigateToPersonalInfo = () => {
    navigation.navigate('PersonalInfo', { email, password });
  };

  const handleNextButton = () => {
    navigateToPersonalInfo();
  }

  const navigateToLanding = () => {
      navigation.navigate('Landing');
    }

  // Checks {email}@{site}.{top-level domain}
  const isValidEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
    return (emailRegex.test(email));
  }

  const handleSignUp = async () => {
      try {
        if (!isValidEmail()) {
          console.error("Invalid Email Address")
          return;
        }

        // Confirms matching passwords
        if (password !== confirmPassword) {
          console.error("Passwords do not match");
          return;
        }
        handleNextButton()
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateToLanding} style={styles.arrowContainer}>
          <Icon name="arrow-left" size={30} color="black"/>
        </TouchableOpacity>
        <Text style={styles.title}>Let's get started!</Text>
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
    </TouchableWithoutFeedback>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};