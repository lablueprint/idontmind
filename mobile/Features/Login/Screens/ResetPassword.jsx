import React, { useState, useEffect } from 'react';
import {
  Pressable, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Image } from 'expo-image';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import styles from './ResetPasswordStyle';

function ResetPassword({ route, navigation }) {
  const { curUser } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [allConditionsMet, setAllConditionsMet] = useState(false);
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);
  const [showConfirmPasswordCondition, setShowConfirmPasswordCondition] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumberOrSymbol, setHasNumberOrSymbol] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);

  const handleResetSubmit = async () => {
    try {
      const data = {
        id: curUser._id,
        password,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/resetPassword`, data);
      if (res.data.success === true) {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumOrSym = /[\d\W]/.test(password);
    const isMinLen = password.length >= 8;

    setHasLowercase(hasLower);
    setHasUppercase(hasUpper);
    setHasNumberOrSymbol(hasNumOrSym);
    setIsMinLength(isMinLen);

    setAllConditionsMet(hasLower && hasUpper && hasNumOrSym && isMinLen);
  }, [password, confirmPassword]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5F8F3' }}>
      <View style={{ width: '83%', marginTop: '40%' }}>
        <Image
          source={require('../../../assets/images/package.png')}
          style={{height: '78%', width: '78%', overflow: 'visible', zIndex: -1, position: 'absolute', bottom: '70%', marginLeft: '10%'}}
        />
        <Text style={{ fontSize: 40, fontWeight: 300, marginBottom: '10%'}}>
          Reset Password
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: '2%', color: '#767C7C' }}>
          Password
        </Text>
        <View style={[styles.emailInput, styles.shadowProp]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '85%', height: '100%', alignItems: 'center'}}>
            <TextInput
              style={{width: '70%'}}
              placeholder="Enter password"
              onFocus={() => {
                setShowPasswordConditions(true);
                setShowConfirmPasswordCondition(false);
              }}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#767C7C" />
            </Pressable>
          </View>
        </View>
        {showPasswordConditions && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ width: '50%' }}>
              <PasswordRequirement isValid={hasLowercase} text="A lowercase letter" />
            </View>
            <View style={{ width: '50%' }}>
              <PasswordRequirement isValid={hasUppercase} text="An uppercase letter" />
            </View>
            <View style={{ width: '50%' }}>
              <PasswordRequirement isValid={hasNumberOrSymbol} text="A number or symbol" />
            </View>
            <View style={{ width: '50%' }}>
              <PasswordRequirement isValid={isMinLength} text="At least 8 characters" />
            </View>
          </View>
        )}
        <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: '2%', marginTop: '6%', color: '#767C7C' }}>
          Confirm Password
        </Text>
        <View style={[styles.emailInput, styles.shadowProp]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '85%', height: '100%', alignItems: 'center'}}>
            <TextInput
              style={{width: '70%'}}
              placeholder="Confirm password"
              onFocus={() => {
                setShowPasswordConditions(false);
                setShowConfirmPasswordCondition(true);
              }}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} size={24} color="#767C7C" />
            </Pressable>
          </View>
        </View>
        {showConfirmPasswordCondition && (
          <View style={{ marginTop: 10 }}>
            <PasswordRequirement isValid={passwordsMatch} text="Passwords match" />
          </View>
        )}
      </View>
      <View style={styles.sendButtonContainer}>
        <Pressable
          title="Send Button"
          style={[styles.sendButton, (!passwordsMatch || !allConditionsMet) && { backgroundColor: '#C8C8C8', opacity: 0.5 }]}
          onPress={handleResetSubmit}
          disabled={!passwordsMatch || !allConditionsMet}
        >
          <Text style={[styles.sendButtonText, (!passwordsMatch || !allConditionsMet) && { color: 'black' }]}>Confirm Change</Text>
        </Pressable>
      </View>
    </View>
  );
}

const PasswordRequirement = ({ isValid, text }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
    <FontAwesome name={isValid ? 'check-circle' : 'times-circle'} size={16} color={isValid ? 'green' : '#9B290F'} />
    <Text style={{ fontSize: 13, marginLeft: 10, color: '#676C6C'}}>{text}</Text>
  </View>
);

PasswordRequirement.propTypes = {
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

ResetPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default ResetPassword;
