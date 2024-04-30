import {
  Text, View, Pressable, Image
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './CheckInStyles';

function CheckIn({ navigation }) {
  const numPages = 4.0;

  const beginCheckIn = () => {
    navigation.navigate('Feeling', { numPages });
  };

  const continueToDashBoard = () => {
    console.log("back");
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'blue', backgroundColor: '#E5F8F3' }}>
      <View style={[styles.checkInContentContainer, { marginBottom: '40%' }]}>
        <Text style={styles.welcomeText}>Hi Daniel!</Text>
        <Text style={styles.welcomeText}>What is your</Text>
        <Text style={styles.welcomeText}>mood like today?</Text>
        <View style={[styles.checkInButtonsContainer, { marginTop: '10%' }]} >
          <Pressable style={styles.backButton} onPress={continueToDashBoard}>
            <Image
              source={require('../../assets/images/backArrow.png')}
              style={styles.backArrow}
            />
          </Pressable>
          <Pressable style={styles.beginCheckInButton} onPress={beginCheckIn}>
            <Text style={styles.beginCheckInText}>Begin Check-In</Text>
          </Pressable>
        </View>
      </View>
      <Image
        source={require('../../assets/images/lilGuy.png')}
        style={styles.checkInMascot}
      />
    </View>
  );
}

export default CheckIn;

CheckIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
