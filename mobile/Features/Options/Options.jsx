import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../Other/Screens/OptionStyle';
import Back from '../../assets/images/back.png';
import Settings from '../../assets/images/settings.png';
import Account from '../../assets/images/account.png';
import Right from '../../assets/images/right_options.png';
import Customize from '../../assets/images/pen.png';

function Options({ navigation }) {
  const navigateToPersonalInformation = () => {
    console.log('personal info');
    navigation.navigate('Personal Info');
  };
  const navigateToResetPassword = () => {
    console.log('reset password');
    navigation.navigate('Reset Password');
  };
  const navigateToPushNotifs = () => {
    console.log('push notifs');
    navigation.navigate('Push Notifications Options');
  };
  const navigateToContentRecs = () => {
    console.log('content recs');
    navigation.navigate('WOYM');
  };
  const navigateToContentAvoid = () => {
    console.log('content avoid');
    navigation.navigate('WOYM');
  };

  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 100, flex: 1,
      }}
    >
      <View style={{ flex: 1, borderBottomColor: '#26292E', borderBottomWidth: 0.5 }}>
        <View style={{
          display: 'flex', flexDirection: 'row',
        }}
        >
          <TouchableOpacity color="black" style={{ flex: 1, alignSelf: 'flex-start' }}>
            <Image
              style={{
                resizeMode: 'contain', height: 20, width: 20,
              }}
              source={Back}
            />
          </TouchableOpacity>
          <Text style={{
            flex: 8, textAlign: 'left', fontSize: 18, fontFamily: 'cabinet-grotesk-bold', color: '#4A4E4E',
          }}
          >
            DASHBOARD
          </Text>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'row', paddingTop: 20,
        }}
        >
          <Text style={{
            flex: 1, fontSize: 40, fontFamily: 'recoleta-regular', textAlign: 'left', color: '#343A3A',
          }}
          >
            Options
          </Text>
          <View style={{ flex: 1.3 }}>
            <Image
              source={Settings}
              style={{
                resizeMode: 'contain', height: 50, width: 50, justifyContent: 'flex-start',
              }}
            />
          </View>
        </View>
      </View>
      <View style={{
        display: 'flex', flex: 5, paddingTop: 20,
      }}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{
            flex: 1, fontSize: 24, fontFamily: 'recoleta-regular', color: '#4A4E4E',
          }}
          >
            Account
          </Text>
          <View style={{ flex: 2.5, justifyContent: 'flex-end', paddingBottom: 7 }}>
            <Image
              source={Account}
              style={{ resizeMode: 'contain', height: 25, width: 25 }}
            />
          </View>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'row', padding: 20, paddingTop: 30,
        }}
        >
          <Text style={{
            flex: 1, fontSize: 16, color: '#676C6C', fontFamily: 'cabinet-grotesk-regular',
          }}
          >
            Personal Information
          </Text>
          <Pressable onPress={navigateToPersonalInformation}>
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </Pressable>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'row', padding: 20, paddingTop: 0,
        }}
        >
          <Text style={{
            flex: 1, fontSize: 16, color: '#676C6C', fontFamily: 'cabinet-grotesk-regular',
          }}
          >
            Reset Password
          </Text>
          <Pressable onPress={navigateToResetPassword}>
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </Pressable>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{
            flex: 1, fontSize: 24, fontFamily: 'recoleta-regular', color: '#4A4E4E',
          }}
          >
            Customize
          </Text>
          <View style={{ flex: 1.7, justifyContent: 'flex-end', paddingBottom: 7 }}>
            <Image
              source={Customize}
              style={{ resizeMode: 'contain', height: 25, width: 25 }}
            />
          </View>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'row', padding: 20, paddingTop: 30,
        }}
        >
          <Text style={{
            flex: 1, fontSize: 16, color: '#676C6C', fontFamily: 'cabinet-grotesk-regular',
          }}
          >
            Push Notifications
          </Text>
          <Pressable onPress={navigateToPushNotifs}>
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </Pressable>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'row', padding: 20, paddingTop: 0,
        }}
        >
          <Text style={{
            flex: 1, fontSize: 16, color: '#676C6C', fontFamily: 'cabinet-grotesk-regular',
          }}
          >
            Content Recommendations
          </Text>
          <Pressable onPress={navigateToContentRecs}>
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </Pressable>
        </View>
        <View style={{
          display: 'flex', flexDirection: 'row', padding: 20, paddingTop: 0,
        }}
        >
          <Text style={{
            flex: 1, fontSize: 16, color: '#676C6C', fontFamily: 'cabinet-grotesk-regular',
          }}
          >
            Content To Avoid
          </Text>
          <Pressable onPress={navigateToContentAvoid}>

            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </Pressable>
        </View>

      </View>

    </View>
  );
}

export default Options;

Options.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
