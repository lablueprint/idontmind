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
  const navigateToAltFeed = () => {
    navigation.navigate('AltNavigationBar');
  };

  const navigateToCheckIn = () => {
    navigation.navigate('CheckIn');
  };

  const dispatch = useDispatch();

  // Handles a hardcoded login for testing
  const handleHardcodedLogin = async () => {
    try {
      const userData = {
        email: 'sample@gmail.com',
        password: 'sample',
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/signin`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        console.log(res.data);
        dispatch(login(res.data));
        navigateToFeed();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handles a hardcoded login for testing
  const handlenNewHardcodedLogin = async () => {
    try {
      const userData = {
        email: 'sample@gmail.com',
        password: 'sample',
      };
      const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/signin`, userData);
      if (res.data.error) {
        console.error(res.data.error);
      } else {
        dispatch(login(res.data));
        navigateToAltFeed();
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
        title="Hardcoded Sign In (with new nav bar)"
        onPress={handlenNewHardcodedLogin}
      />
      <Button
        title="To Splash"
        onPress={navigateToSplash}
      />
      {/* <Button
        title="To CheckIn"
        onPress={navigateToCheckIn}
      /> */}
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
