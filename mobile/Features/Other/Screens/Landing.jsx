// to be deleted after this round of PR's finish.
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
    navigation.navigate('NavigationBar');
  };

  const dispatch = useDispatch();

  // Handles a hardcoded login for testing
  const handleHardcodedLogin = async () => {
    try {
      const userData = {
        email: 'sample@gmail.com',
        password: 'sample',
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

  const navigateToSplash = () => {
    navigation.navigate('Splash');
  };

  const navigateToLoading = () => {
    navigation.navigate('Loading');
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
      <Button
        title="To Splash"
        onPress={navigateToSplash}
      />
      <Button
        title="To Loading"
        onPress={navigateToLoading}
      />
    </View>
  );
}

Landing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
