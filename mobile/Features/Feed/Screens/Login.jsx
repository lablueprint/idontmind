import {
  Text, View, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: 100,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
  },
  buttonShape: {
    backgroundColor: '#C0C0C0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigateToFeed = () => {
    navigation.navigate('Feed');
  };

  const navigateToLanding = () => {
    navigation.navigate('Landing');
  }

  const handleLogin = async () => {
    try {

      const userEmail = email.toLowerCase();
      const userData = {
        email: userEmail,
        password,
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/signin`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        dispatch(login(res.data));
        setEmail('');
        setPassword('');
        navigateToFeed();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToLanding} style={styles.arrowContainer}>
        <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome back!</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="jeff@idontmind.com"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.buttonShape}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
