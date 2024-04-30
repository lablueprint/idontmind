import {
  View, Text, TouchableOpacity, Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import gear from '../../../assets/images/gear.png';
import styles from './ContentDashboardStyle';
import rightChev from '../../../assets/images/rightChevron.png';

export default function ContentDashboard({ navigation }) {
  const navigateToDayChallenge = () => {
    navigation.navigate('Day Challenge');
  };
  return (
    <ScrollView>
      <View style={{
        display: 'flex', flexDirection: 'column', marginTop: 100, width: '80%', alignSelf: 'center',
      }}
      >
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={styles.gearBackground}
          >
            <View style={styles.gearContainer}>
              <Image
                source={gear}
                style={styles.gear}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'column', paddingTop: 50, fontSize: 38,
        }}
        >
          <Text style={styles.largeText}>Welcome Daniel,</Text>
          <Text style={styles.medText}>We&apos;re so glad you&apos;re here!</Text>
        </View>
        <Text style={styles.insights}>Your Insights</Text>
        <TouchableOpacity style={styles.moodTendencies}>
          <Text style={styles.MTText}>Mood Tendencies</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TouchableOpacity style={styles.middleButtons}>
            <Image
              source={rightChev}
              style={styles.leftChev}
            />
            <Text style={styles.offWhite}>Check-In</Text>
            <Image
              source={rightChev}
              style={styles.rightChev}
            />
          </TouchableOpacity>
          <View style={{ height: 20 }} />
          <TouchableOpacity
            style={styles.middleButtons}
            onPress={navigateToDayChallenge}
          >
            <Image
              source={rightChev}
              style={styles.leftChev}
            />
            <Text style={styles.offWhite}>30 Day Challenge</Text>
            <Image
              source={rightChev}
              style={styles.rightChev}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <View style={styles.dailyBookmarkLine}>
          <Text style={styles.insights}>Daily Discovery</Text>
          <TouchableOpacity>
            <Text style={styles.yourBookmarks}>Your Bookmarks</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }}
        >
          <TouchableOpacity style={styles.DDButtons}>
            <Text style={styles.DDText}>Check-In</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
          <TouchableOpacity
            style={styles.DDButtons}
            onPress={navigateToDayChallenge}
          >
            <Text style={styles.DDText}>30 Day Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

ContentDashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
