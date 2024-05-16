import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import puzzle from '../../assets/images/puzzle.png';
import styles from './OverviewStyle';

export default function MoreResources({ navigation }) {
  const next = () => {
    navigation.navigate('WrapUp');
  };
  return (
    <View style={{
      display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
    }}
    >
      <Text style={styles.title}>At your own pace</Text>
      <Text style={styles.subtitle}>
        Between daily journal prompts, a guided 30 day digital detox, and access to free 24/7
        support, there&apos;s plenty more resources for you to explore.
      </Text>
      <Image source={puzzle} style={styles.pic} />
      <View>
        <TouchableOpacity style={styles.continue} onPress={next}>
          <Text style={styles.contText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

MoreResources.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
