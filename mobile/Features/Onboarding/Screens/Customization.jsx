import {
  Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { login } from '../../../redux/authSlice';
import styles from '../Components/OnboardingStyling';

export default function Customization({ navigation }) {
  const route = useRoute();

  // Used to connect with redux (current state)
  const dispatch = useDispatch();

  const navigateToPersonalInfo = () => {
    navigation.navigate('PersonalInfo');
  };

  const navigateToFeed = () => {
    navigation.navigate('NavigationBar');
  };

  const handleSignUp = async () => {
    const email = route.params?.loginInfo.email;
    const password = route.params?.loginInfo.password;
    const firstName = route.params?.firstName;
    try {
      // Ensures all emails are lowercase when stored in backend
      const userEmail = email.toLowerCase();
      const userData = {
        email: userEmail,
        password,
        firstName,
      };
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/signup`,
        userData,
        { headers: { 'x-api-key': `${process.env.EXPO_SECRET_API_KEY}` } },
      );

      if (res.data.error) {
        console.error(res.data.error);
      } else { // If sign up is successful
        const res2 = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/offUser/signin`,
          userData,
          { headers: { 'x-api-key': `${process.env.EXPO_SECRET_API_KEY}` } },
        );
        // Sets current state variables for session
        dispatch(login(res2.data));
        navigateToFeed();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateToPersonalInfo} style={styles.arrowContainer}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>What&apos;s on your mind?</Text>
        <View style={styles.paginationContainer}>
          <View style={[styles.inactivePaginationDot]} />
          <View style={[styles.inactivePaginationDot]} />
          <View style={[styles.activePaginationDot]} />
        </View>
        <View style={styles.buttonShape}>
          <TouchableOpacity
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>All Set!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

Customization.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
