import {
  Text, View, StyleSheet, Image,
} from 'react-native';
import IDMlogo from '../../assets/idontmindlogo.png';
import styles from './LoadingStyle';

function Loading() {
  
  return (
    <View style={styles.container}>
        <Image source={IDMlogo} style={styles.logo} />
        <Text>Loading</Text>
    </View>
  );
}

export default Loading;