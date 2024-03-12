import { useState } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import shape from '../../assets/shape.png';
import styles from './WOYMStyle';

function Water({ navigation }) {
  const [glasses, setGlasses] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>
          how much water have you had today?
        </Text>
      </View>
    </View>
  );
}

export default Water;

// navigation is currently not used
// but will be used when integrated with other files in the register pipeline
Water.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
