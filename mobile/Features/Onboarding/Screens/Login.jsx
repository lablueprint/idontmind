import {
  Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login } from '../../../redux/authSlice';
import styles from '../Components/OnboardingStyling';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigateToFeed = () => {
    navigation.navigate('NavigationBar');
  };

  const navigateToLanding = () => {
    navigation.navigate('Landing');
  };

  const handleLogin = async () => {
    try {
      // Ensures valid case-sensitive email
      const userEmail = email.toLowerCase();
      const userData = {
        email: userEmail,
        password,
      };
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/signin`,
        userData,
        { headers: { 'x-api-key': `${process.env.EXPO_SECRET_API_KEY}` } },
      );
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        // Sets current state variables for session
        dispatch(login(res.data));
        setEmail('');
        setPassword('');
        navigateToFeed();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handles pagination dots visibility for password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="black" style={styles.eyeIcon} />
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
