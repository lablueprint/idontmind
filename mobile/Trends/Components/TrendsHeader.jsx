import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import TrendImage from '../../assets/TrendImage.png';
import styles from './TrendsStyle';

export default function TrendsHeader() {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ position: 'relative' }}>
        <Image source={TrendImage} style={{ position: 'absolute', height: 75, width: 125 }} />
        <Text style={styles.title}>Trends</Text>
      </View>

      <View style={{
        alignSelf: 'center', display: 'flex', flexDirection: 'row', gap: 20, marginRight: 10,
      }}
      >
        <TouchableOpacity>
          <Text style={{ fontSize: 18 }}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 18 }}>Month</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
