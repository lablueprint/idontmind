import React, { useState, useEffect } from 'react';
import {
  Pressable, Text, View, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = StyleSheet.create({
  emailInput: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  sendButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: '90%',
  },
  sendButton: {
    width: '48%',
    borderRadius: 99,
    backgroundColor: '#C8C8C8',
    paddingVertical: 14,
  },
  sendButtonText: {
    alignSelf: 'center',
    color: '#7A7A7A',
    fontSize: 14,
    fontWeight: 600,
  },
});

function ResetPassword({ route, navigation }) {
  const { curUser } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

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
  }, [password, confirmPassword]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '83%', marginTop: '15%' }}>
        <Text style={{ fontSize: 40, fontWeight: 325 }}>
          Reset Password
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          Password
        </Text>
        <TextInput
          style={[styles.emailInput, styles.shadowProp]}
          placeholder="Enter password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          Confirm Password
        </Text>
        <TextInput
          style={[styles.emailInput, styles.shadowProp]}
          placeholder="Confirm password"
          onChangeText={(text) => {
            setConfirmPassword(text);
            setShowMessage(text.length > 0); // Show message when confirm password has length > 0
          }}
          value={confirmPassword}
          secureTextEntry={true}
        />
        {showMessage && !passwordsMatch && (
          <Text>Passwords do not match</Text>
        )}
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
