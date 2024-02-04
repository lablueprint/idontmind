import {
    Button, Text, View, TextInput,
  } from 'react-native';
  import { useState } from 'react';
  import PropTypes from 'prop-types';
  import axios from 'axios';
  import { useDispatch } from 'react-redux';
  import { login } from '../../../redux/authSlice';
  
  export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
  
    const navigateToFeed = () => {
      navigation.navigate('Feed');
    };

    const navigateToLanding = () => {
        navigation.navigate('Landing');
      }

    const isValidEmail = async () => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        return false;
      }
      return true;
    }
  
    const handleSignUp = async () => {
        try {

          if (!isValidEmail()) {
            console.error("Invalid Email Address")
            return;
          }

          if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
          }
      
          const userData = {
            email,
            password,
          };
          const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/signup`, userData);
      
          if (res.data.error) {
            console.error(res.data.error);
          } else {
            const res2 = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/signin`, userData);
            dispatch(login(res2.data));
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('Feed');
          }
        } catch (err) {
          console.error(err.message);
        }
      };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SignUp Page</Text>
        <Button
          title="To Landing"
          onPress={navigateToLanding}
        />
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button
          title="Enter"
          onPress={handleSignUp}
        />
        <Button
          title="To Feed"
          onPress={navigateToFeed}
        />
      </View>
    );
  }
  
  SignUp.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };