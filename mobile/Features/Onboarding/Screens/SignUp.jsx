import {
  Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from '../Components/OnboardingStyling';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordConditionsMet, setPasswordConditionsMet] = useState(new Set());
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const navigateToPersonalInfo = () => {
    navigation.navigate('PersonalInfo', { email, password });
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

  // Checks if passwords are the same
  const isSamePassword = () => (password === confirmPassword);

  // Checks if password meets all conditions needed
  const isValidPassword = () => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberOrSymbolRegex = /[0-9]|[^\w\s]/;

    const newSet = new Set();

    lowercaseRegex.test(password) ? newSet.add('lower') : newSet.delete('lower');
    uppercaseRegex.test(password) ? newSet.add('upper') : newSet.delete('upper');
    numberOrSymbolRegex.test(password) ? newSet.add('numsym') : newSet.delete('numsym');
    password.length >= 8 ? newSet.add('length') : newSet.delete('length');

    setPasswordConditionsMet(newSet);

    return (newSet.size === 4);
  };

  // Toggles showing password requirements under password
  const isShowingPasswordRequirements = () => {
    if (!showPasswordRequirements) {
      if (password.length > 0) {
        setShowPasswordRequirements(true);
      }
    }
  };

  // Toggles showing password matched requirement under confirm password
  const isShowingPasswordMatch = () => {
    if (!showPasswordMatch) {
      if (confirmPassword.length > 0) {
        setShowPasswordMatch(true);
      }
    }
  };

  const notAllConditionsMet = () => {
    if (!isValidEmail() || !isSamePassword() || !isValidPassword()) {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  };

  useEffect(() => {
    isValidPassword();
    isShowingPasswordRequirements();
    isShowingPasswordMatch();
    notAllConditionsMet();
  }, [password, confirmPassword, setPassword]);

  useEffect(() => {
  }, [passwordConditionsMet, setShowPasswordRequirements, setShowPasswordMatch, setButtonEnabled]);

  const handleSignUp = async () => {
    try {
      if (!isValidEmail()) {
        console.error('Invalid Email Address');
        return;
      }

      if (!isSamePassword()) {
        console.error('Passwords do not match');
        return;
      }

      if (!isValidPassword()) {
        console.error('Password conditions not met');
        return;
      }

      handleNextButton();
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
        {showPasswordRequirements && (
        <View style={styles.allPasswordConditionsContainer}>
          <View style={styles.passwordConditionRow}>
            <FontAwesomeIcon
              icon={passwordConditionsMet.has('lower') ? faCheck : faTimes}
              style={[styles.lowerCondition, { color: passwordConditionsMet.has('lower') ? 'green' : 'red' }]}
            />
            <Text style={styles.passwordConditionText}>A lowercase letter</Text>
            <FontAwesomeIcon
              icon={passwordConditionsMet.has('upper') ? faCheck : faTimes}
              style={[styles.upperCondition, { color: passwordConditionsMet.has('upper') ? 'green' : 'red' }]}
            />
            <Text style={styles.passwordConditionText}>An uppercase letter</Text>
          </View>
          <View style={styles.passwordConditionRow}>
            <FontAwesomeIcon
              icon={passwordConditionsMet.has('numsym') ? faCheck : faTimes}
              style={[styles.numsymCondition, { color: passwordConditionsMet.has('numsym') ? 'green' : 'red' }]}
            />
            <Text style={styles.passwordConditionText}>A number or symbol</Text>
            <FontAwesomeIcon
              icon={passwordConditionsMet.has('length') ? faCheck : faTimes}
              style={[styles.lengthCondition, { color: passwordConditionsMet.has('length') ? 'green' : 'red' }]}
            />
            <Text style={styles.passwordConditionText}>At least 8 characters</Text>
          </View>
        </View>
        )}
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
        {showPasswordMatch && (
        <View style={styles.allPasswordConditionsContainer}>
          <View style={styles.passwordConditionLastRow}>
            <FontAwesomeIcon
              icon={isSamePassword() ? faCheck : faTimes}
              style={[styles.matchPassCondition, { color: isSamePassword() ? 'green' : 'red' }]}
            />
            <Text style={styles.passwordConditionText}>Passwords match</Text>
          </View>
        </View>
        )}
        <View style={styles.paginationContainer}>
          <View style={[styles.activePaginationDot]} />
          <View style={[styles.inactivePaginationDot]} />
          <View style={[styles.inactivePaginationDot]} />
        </View>
        <View style={styles.buttonShape}>
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={!buttonEnabled}
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
