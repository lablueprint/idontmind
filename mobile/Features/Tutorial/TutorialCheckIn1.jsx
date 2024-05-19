import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import chat from '../../assets/images/chat.png';
import styles from './OverviewStyle';

export default function TutorialCheckIn1({ navigation }) {
  const next = () => {
    navigation.navigate('TutorialCheckIn2');
  };
  return (
      <View style={{
        display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
      }}
      >
        <Text style={styles.title}>Just checking in</Text>
        <Text style={styles.subtitle}>
          Every day, we&apos;ll send a few quick check-in
          questions your way to get you thinking about how you&apos;re doing.
        </Text>
        <Image source={chat} style={styles.pic} />
        <View>
          <TouchableOpacity style={styles.continue} onPress={next}>
            <Text style={styles.contText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

TutorialCheckIn1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
