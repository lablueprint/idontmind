import {
  Button, Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';

export default function Landing({ navigation }) {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const navigateToFeed = () => {
    navigation.navigate('Feed');
  }
  
  const dispatch = useDispatch();

  const handleHardcodedLogin = async () => {
    try {
      const userData = {
        email: 'poop@gmail.com',
        password: 'poop',
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/users/signin`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        dispatch(login(res.data));
        navigateToFeed();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>IDONTMIND</Text>
      <Button
        title="Get Started"
        onPress={navigateToSignUp}
      />
      <Button
        title="Already have an account?"
        onPress={navigateToLogin}
      />
      <Button
        title="Hardcoded Sign In"
        onPress={handleHardcodedLogin}
      />
    </View>
  );
}

Landing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
