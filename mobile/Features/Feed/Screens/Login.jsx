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
    backgroundColor: '#E3F5F4',
  },
  arrowContainer: {
    position: 'absolute',
    top: 100,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flexDirection: 'row', 
    alignItems: 'center',
    height: 63,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  inputBox: {
    height: 40,
    width: 300,
    marginTop: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  buttonShape: {
    backgroundColor: '#C0C0C0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 10,
    width: 258,
    height: 70,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 12,
  },
  eyeIcon: {
    marginTop: 5,
  },
});

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToLanding} style={styles.arrowContainer}>
        <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome back!</Text>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="jeff@idontmind.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" style={styles.eyeIcon}/>
          </TouchableOpacity>
        </View>
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
