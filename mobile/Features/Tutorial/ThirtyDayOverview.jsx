import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import account from '../../assets/images/account.png';
import styles from './ThirtyDayOverviewStyle';

export default function ThirtyDayOverview({ navigation }) {
  const next = () => {
    navigation.navigate('ThirtyDayChallenge');
  };
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', width: '80%', alignSelf: 'center', marginTop: '15%',
    }}
    >
      <Text style={styles.title}>
        Welcome to the 30 Day Challenge!
      </Text>
      <Text style={styles.subtitle}>
        Embark on a 30-day journey to balance your digital life with real-world experiences.
        This is to help you get off of your phone and be fully present and mentally healthy in
        the world around you.
      </Text>
      <Image source={account} style={styles.pic} />
      <Text style={styles.subtitle}>
        Each day you&apos;ll receive an intentional activity or reflection that&apos;s
        meant to enhance your mood and mental well-being.
      </Text>
      <View>
        <TouchableOpacity style={styles.continue} onPress={next}>
          <Text style={styles.contText}>Get Started!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

ThirtyDayOverview.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
