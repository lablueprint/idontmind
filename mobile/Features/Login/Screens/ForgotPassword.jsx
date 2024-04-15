import {
  Pressable, Text, View, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './ForgotPasswordStyle';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const generateToken = () => {
    // Generates a "random" 6-digit number
    const q = (Math.floor(100000 + Math.random() * 900000));
    return q;
  };

  const handleEmailSubmit = async () => {
    try {
      const data = {
        email,
      };

      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/checkUserByEmail`, data);
      if (res.data.success && (res.data.user.email).toLowerCase() === email.toLowerCase()) {
        const curUser = res.data.user;
        setToken(generateToken());
        navigation.navigate('Token Input', { token, email, curUser });
        const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/sendEmail`, { email, token });
        if (response.data === true) {
          console.log('Successfully sent email!');
        }
      } else {
        console.log('There was an issue resetting your password. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5F8F3' }}>
      <View style={{ width: '83%', marginTop: '15%' }}>
        <Text style={{ fontSize: 40, fontWeight: 300 }}>
          Forgot Password?
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginTop: '2%' }}>
          Enter your email address to receive instructions for resetting your password.
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600, marginTop: '15%', marginBottom: '3%', color: '#767C7C' }}>
          Email
        </Text>
        <TextInput
          style={styles.emailInput}
          placeholder="jeff@idontmind.com"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.sendButtonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            { backgroundColor: email.trim() ? '#546967' : '#C8C8C8' }, // Change button background color based on if email has text
            pressed && styles.buttonPressed,
          ]}
          onPress={handleEmailSubmit}
          disabled={!email.trim()} // Disable button if email is empty or only contains whitespace
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
