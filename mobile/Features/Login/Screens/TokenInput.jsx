import {
  Text, View, TouchableOpacity, Button,
} from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';
import styles from './TokenInputStyle';

function TokenInput({ route, navigation }) {
  const { email, curUser } = route.params;
  const [token, setToken] = useState(route.params.token);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState();
  const [countdown, setCountdown] = useState(15);
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const sendNewToken = async () => {
    try {
      const newToken = Math.floor(100000 + Math.random() * 900000);
      console.log(`Token ${newToken} sent to email: ${email}`);
      setToken(newToken);
      setCountdown(15);
      const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/sendEmail`, { email, token });
    } catch (error) {
      console.error("Error generating or sending token:", error);
    }
  };

  if (parseInt(value, 10) === token) {
    navigation.navigate('Reset Password', { curUser });
    setValue('');
  }

  useEffect(() => {
    setToken(route.params.token);
    setCountdown(15);
  }, [route.params.token]);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      // Clear interval when countdown reaches zero
      clearInterval(interval);
      setToken('');
    }
    // Cleanup function to clear interval on unmount
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5F8F3' }}>
      <View style={{ width: '83%', marginTop: '15%' }}>
        <Text>
          {token}
        </Text>
        <Text style={{ fontSize: 40, fontWeight: 300, marginBottom: '1%' }}>
          Reset Password
        </Text>
        <Text>
          Enter the 6-digit code that was sent to your email to reset your password.
        </Text>
        <Text style={{marginTop: '12%', color: '#767C7C' }}>
          Sent to {email.toLowerCase()} {countdown > 0 ? `(${countdown}s)` : '(Token timed out)'}
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
                    navigation.navigate('Forgot Password');
                  }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: '90%'}}
                >
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>Edit Email</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', height: 20 }} />
            </View>
            <View style={{ backgroundColor: 'white', padding: 18, borderRadius: 10, alignItems: 'center', width: '100%', marginTop: '5%' }}>
              <TouchableOpacity 
                onPress={() => setShowModal(false)}
                style={{ justifyContent: 'center', alignItems: 'center', width: '100%'}}
              >
                <Text style={{ fontSize: 16, fontWeight: '500', color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
