import {
  Pressable, Text, View, TextInput, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '83%', marginTop: '15%' }}>
        <Text style={{ fontSize: 40, fontWeight: 325 }}>
          Forgot Password?
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          Enter your email address to receive instructions for resetting your password.
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>
          Email
        </Text>
        <TextInput
          style={[styles.emailInput, styles.shadowProp]}
          placeholder="jeff@idontmind.com"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.sendButtonContainer}>
        <Pressable
          title="Send Button"
          style={styles.sendButton}
          onPress={handleEmailSubmit}
        >
          <Text style={styles.sendButtonText}>Send Instructions</Text>
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
