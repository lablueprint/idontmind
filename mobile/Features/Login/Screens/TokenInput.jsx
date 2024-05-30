import {
  Text, View, TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import * as Crypto from 'expo-crypto';
import axios from 'axios';
import styles from './TokenInputStyle';

function TokenInput({ route, navigation }) {
  const { email, curUser } = route.params;
  const [token, setToken] = useState(route.params.token);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState();
  const [countdown, setCountdown] = useState(1800);
  const [tokenExpired, setTokenExpired] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const generateSixDigitNumber = () => {
    const buffer = Crypto.getRandomBytes(4);
    const array = new Uint32Array(buffer.buffer);
    const number = array[0] % 900000;
    return parseInt(number + 100000, 10);
  };

  const sendNewToken = async () => {
    try {
      const newToken = generateSixDigitNumber();
      console.log(`Token ${newToken} sent to email: ${email}`);
      setToken(newToken);
      setCountdown(1800);
      setTokenExpired(false);
      const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/sendEmail`, { email: 'bpidontmind@gmail.com', token: newToken });
      console.log(5, response.data);
      if (response.data) {
        console.log('Email sent successfully with new token.');
      } else {
        console.error('Failed to send email with new token:', response.data.message);
      }
    } catch (error) {
      console.error('Error generating or sending token:', error);
    }
  };

  if (parseInt(value, 10) === token) {
    navigation.navigate('ResetPassword', { curUser });
    setValue('');
  }

  useEffect(() => {
    setToken(route.params.token);
    setCountdown(1800);
  }, [route.params.token]);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTokenExpired(true);
      setToken('');
    }
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5F8F3' }}>
      <View style={{ width: '83%', marginTop: '15%' }}>
        <Image
          source={require('../../../assets/images/package.png')}
          style={{height: '92%', width: '92%', overflow: 'visible', zIndex: -1, position: 'absolute', bottom: '77%'}}
        />
        <Text style={{ fontSize: 40, fontWeight: 300, marginBottom: '1%' }}>
          Reset Password
        </Text>
        <Text>
          Enter the 6-digit code that was sent to your email to reset your password.
        </Text>
        <Text style={{marginTop: '12%', color: '#767C7C' }}>
          Sent to {email.toLowerCase()}
        </Text>
        <View>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={{ color: '#767C7C', marginTop: '2%', fontSize: 13, alignSelf: 'flex-end'}}>Didn&apos;t get a code?</Text>
        </TouchableOpacity>
        <Modal
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: '15%' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10, alignItems: 'center', height: '17%'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    sendNewToken();
                    setShowModal(false);
                  }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '90%', marginTop: '0.5%' }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Send Again</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: '#C6CECE' }} />
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('ForgotPassword');
                  }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '90%'}}
                >
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Edit Email</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', height: 20 }} />
            </View>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <View style={{ backgroundColor: 'white', padding: 18, borderRadius: 10, alignItems: 'center', width: '100%', marginTop: '5%' }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'red' }}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        {tokenExpired ? (
          <View>
            <Text style={{ color: 'red', marginTop: '2%', textAlign: 'right' }}>Token expired or invalid.</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

TokenInput.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default TokenInput;
