import {
  Pressable, Text, View, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Crypto from 'expo-crypto';
import styles from './ForgotPasswordStyle';

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [showError, setShowError] = useState(false);
  const [curUser, setCurUser] = useState(null);

  const generateSixDigitNumber = () => {
    const buffer = Crypto.getRandomBytes(4);
    const array = new Uint32Array(buffer.buffer);
    const number = array[0] % 900000;
    return parseInt(number + 100000, 10);
  };

  const handleEmailSubmit = async () => {
    try {
      const data = { email };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/checkUserByEmail`, data);
      if (res.data.success && (res.data.user.email).toLowerCase() === email.toLowerCase()) {
        const userData = res.data.user;
        console.log(10, userData);
        const newToken = generateSixDigitNumber();
        setCurUser(userData);
        setToken(newToken);
        setShowError(false);

        console.log(11, curUser);
        // navigation.navigate('Token Input', { token: newToken, email, curUser });
        const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/sendEmail`, { email, token: newToken });
        if (response.data) {
          console.log('Successfully sent email!');
        } else {
          console.log('Failed to send email:', response);
        }
      } else {
        console.log('No user found with that email address.');
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
      console.error('Error during email submission:', error);
    }
  };

  useEffect(() => {
    if (token && curUser) {
      navigation.navigate('TokenInput', { token, email, curUser });
    }
  }, [token, curUser, navigation]);

  return (
    <View style={{
      flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5F8F3',
    }}
    >
      <Image
        source={require('../../../assets/images/package.png')}
        style={{height: '32%', width: '32%', overflow: 'visible', zIndex: -1, position: 'absolute', bottom: '54%'}}
      />
      <View style={{ width: '83%', marginTop: '15%' }}>
        <Text style={{ fontSize: 40, fontWeight: 300 }}>
          Forgot Password?
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginTop: '4%' }}>
          Enter your email address to receive instructions for resetting your password.
        </Text>
        <Text style={{
          fontSize: 16, fontWeight: 600, marginTop: '15%', marginBottom: '3%', color: '#767C7C',
        }}
        >
          Email
        </Text>
        <TextInput
          style={styles.emailInput}
          placeholder="jeff@idontmind.com"
          onChangeText={setEmail}
          value={email}
        />
        {showError ? (
          <Text style={{ color: 'red', marginTop: 10 }}>Email does not exist.</Text>
        ) : null}
      </View>
      <View style={styles.sendButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            { backgroundColor: email.trim() ? '#546967' : '#C8C8C8' },
            pressed && styles.buttonPressed,
          ]}
          onPress={handleEmailSubmit}
          disabled={!email.trim()}
        >
          <Text style={[
            styles.sendButtonText,
            { color: email.trim() ? '#FFFFFF' : '#A9A9A9' },
          ]}
          >
            Send Instructions
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ForgotPassword;
