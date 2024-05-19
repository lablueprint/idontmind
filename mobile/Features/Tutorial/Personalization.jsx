import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import science from '../../assets/images/science.png';
import styles from './OverviewStyle';

export default function Personalization({ navigation }) {
  const next = () => {
    navigation.navigate('MoreResources');
  };
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
    }}
    >
      <Text style={styles.title}>Made for you</Text>
      <Text style={styles.subtitle}>
        Based on your check-ins, we&apos;ll show you trends and recommend resources written
        and backed by mental health professionals that fit your needs.
      </Text>
      <Image source={science} style={styles.pic} />
      <View>
        <TouchableOpacity style={styles.continue} onPress={next}>
          <Text style={styles.contText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Personalization.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
