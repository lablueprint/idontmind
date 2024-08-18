import {
  Text, View, Pressable, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import lilguy from '../../assets/images/lilguy.png';
import IDMlogo from '../../assets/images/idontmindlogo.png';
import styles from './SplashStyle';

function Splash({ navigation }) {
  const navigateToTerms = () => {
    navigation.navigate('Terms');
  };

  const navigateToSignup = () => {
    navigation.navigate('SignUp');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.outer}>
      <LinearGradient
        colors={['#BDCEE3', '#CDEDE5']}
        start={{ x: 0.5, y: 0.1 }}
        end={{ x: 0.1, y: 1.0 }}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <Image source={lilguy} style={styles.lilguy} />
          <Image source={IDMlogo} style={styles.logo} />
          <Text style={styles.underLogo}>
            The mental health companion that wants you to delete it with confidence.
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
          <View style={styles.break} />
          <View style={styles.buttonGradient}>
            <LinearGradient
              colors={['#374342', '#546967']}
              start={{ x: 0.05, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            >
              <Pressable style={styles.getStarted} onPress={navigateToSignup}>
                <Text style={styles.gsText}>Get Started</Text>
              </Pressable>
            </LinearGradient>
          </View>
          <Pressable style={styles.signIn} onPress={navigateToLogin}>
            <Text style={styles.siText}>Sign In</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

export default Splash;

Splash.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
