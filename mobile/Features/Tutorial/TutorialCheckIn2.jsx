import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import alarm from '../../assets/images/alarm.png';
import styles from './OverviewStyle';

export default function TutorialCheckIn2({ navigation }) {
  const next = () => {
    navigation.navigate('Personalization');
  };
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
    }}
    >
      <Text style={styles.title}>Just checking in</Text>
      <Text style={styles.subtitle}>
        We&apos;ll prompt you to check in daily to start, then taper off as your mental health
        journey progresses. Allow notifications for the best experience!
      </Text>
      <Image source={alarm} style={styles.pic} />
      <View>
        <TouchableOpacity style={styles.continue} onPress={next}>
          <Text style={styles.contText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

TutorialCheckIn2.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
