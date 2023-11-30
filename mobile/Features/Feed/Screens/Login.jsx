import {
  Button, Text, View, TextInput,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const navigateToFeed = () => {
    navigation.navigate('Feed');
  };

  const handleUsername = async () => {
    console.log(username);
    try {
      const userData = {
        username,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/createUser`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        dispatch(login(res.data));
      }
    } catch (err) {
      console.error(err.message);
    }
    setUsername('');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button
        title="Enter"
        onPress={handleUsername}
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
