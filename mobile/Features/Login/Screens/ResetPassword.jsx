import React, { useState, useEffect } from 'react';
import {
  Pressable, Text, View, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './ResetPasswordStyle';

function ResetPassword({ route, navigation }) {
  const { curUser } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (password === '' || confirmPassword === '') {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5F8F3' }}>
      <View style={{ width: '83%', marginTop: '15%' }}>
        <Text style={{ fontSize: 40, fontWeight: 300, marginBottom: '5%' }}>
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
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#767C7C" />
            </Pressable>
          </View>
        </View>
        <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: '2%', marginTop: '6%', color: '#767C7C' }}>
          Confirm Password
        </Text>
        <View style={[styles.emailInput, styles.shadowProp]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '85%', height: '100%', alignItems: 'center'}}>
            <TextInput
              style={{width: '70%'}}
              placeholder="Confirm password"
              onChangeText={(text) => {
                setConfirmPassword(text);
                setShowMessage(text.length > 0);
              }}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} size={24} color="#767C7C" />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.sendButtonContainer}>
        <Pressable
          title="Send Button"
          style={[styles.sendButton, !passwordsMatch && { backgroundColor: '#C8C8C8', opacity: 0.5 }]}
          onPress={handleResetSubmit}
          disabled={!passwordsMatch}
        >
          <Text style={styles.sendButtonText}>Confirm Change</Text>
        </Pressable>
      </View>
    </View>
  );
}

ResetPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default ResetPassword;
