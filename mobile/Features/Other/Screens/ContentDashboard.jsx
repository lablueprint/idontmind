import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default function ContentDashboard({ navigation }) {
  const navigateToDayChallenge = () => {
    navigation.navigate('Day Challenge');
  };
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity>
          <View style={{
            width: 25, height: 25, backgroundColor: 'lightgrey', alignSelf: 'flex-end',
          }}
          />
        </TouchableOpacity>
      </View>
      <View style={{
        display: 'flex', flexDirection: 'column', paddingTop: 50, fontSize: 38,
      }}
      >
        <Text style={{ fontSize: 38 }}>Welcome Daniel,</Text>
        <Text style={{ fontSize: 28 }}>We&apos;re so glad you&apos;re here</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TouchableOpacity style={{
          display: 'flex', backgroundColor: 'lightgray', flexDirection: 'col', alignItems: 'center', marginTop: 50, marginBottom: 50, width: '75%', borderRadius: 25,
        }}
        >
          <Text style={{ fontSize: 28 }}>Check-In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75%', borderRadius: 25,
          }}
          onPress={navigateToDayChallenge}
        >
          <Text style={{ fontSize: 28 }}>30 Day Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

ContentDashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
