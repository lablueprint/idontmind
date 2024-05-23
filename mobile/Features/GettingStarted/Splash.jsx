import {
  Text, View, Pressable, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import IDMlogo from '../../assets/images/idontmindlogo.png';
import styles from './SplashStyle';

function Splash({ navigation }) {
  const navigateToTerms = () => {
    navigation.navigate('Terms');
  };

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Image source={IDMlogo} style={styles.logo} />
        <Text style={styles.underLogo}>
          The short-term relationship that&apos;s good for your mental health.
        </Text>
        <View style={styles.termsPrivacy}>
          <Text style={styles.termsText}>
            By registering or signing in, you are agreeing to our
          </Text>
          <View style={styles.termsNext}>
            <TouchableOpacity onPress={navigateToTerms}>
              <Text style={styles.buttonWord}>Terms of Service </Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>and</Text>
            <TouchableOpacity onPress={navigateToTerms}>
              <Text style={styles.buttonWord}> Privacy Policy</Text>
            </TouchableOpacity>
            <Text>.</Text>
          </View>
        </View>
        <Pressable style={styles.getStarted}>
          <Text>Get Started</Text>
        </Pressable>
        <Pressable style={styles.signIn}>
          <Text>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Splash;

Splash.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
