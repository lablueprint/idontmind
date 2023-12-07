import {
  Button, Text, View, TextInput,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigateToFeed = () => {
    navigation.navigate('Feed');
  };

  const handleEmail = async () => {
    try {
      const userData = {
        email,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/createUser`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        dispatch(login(res.data));
        setEmail('');
        setPassword('');
        navigation.navigate('Feed');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Enter"
        onPress={handleEmail}
      />
      <Button
        title="To Feed"
        onPress={navigateToFeed}
      />
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
