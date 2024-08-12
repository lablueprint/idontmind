import {
  View, Text, TouchableOpacity, ScrollView, Pressable, Image, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './OptionStyle';
import Back from '../../assets/images/back.png';
import Settings from '../../assets/images/settings.png';
import Account from '../../assets/images/account-icon.png';
import Right from '../../assets/images/right_options.png';
import Customize from '../../assets/images/pen.png';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

function Options({ navigation }) {
  const dispatch = useDispatch();

  const navigateToWelcome = () => {
    navigation.navigate('Landing');
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigateToWelcome();
  };

  const navigateToDashBoard = () => {
    navigation.navigate('Content Dashboard');
  };
  const navigateToPersonalInformation = () => {
    navigation.navigate('Personal Info');
  };
  const navigateToResetPassword = () => {
    navigation.navigate('Reset Password');
  };
  const navigateToPushNotifs = () => {
    navigation.navigate('Push Notifications Options');
  };
  const navigateToContentRecs = () => {
    navigation.navigate('Content Recs');
  };
  const navigateToContentAvoid = () => {
    navigation.navigate('Content To Avoid');
  };

  return (
    <View
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', paddingHorizontal: 25, paddingTop: 100, flex: 1,
      }}
    >
      <View style={{ flex: 1, borderBottomColor: '#26292E', borderBottomWidth: 0.5 }}>
        <Pressable onPress={navigateToDashBoard}>
          <View style={{
            display: 'flex', flexDirection: 'row',
          }}
          >
            <View color="black" style={{ flex: 1, alignSelf: 'flex-start' }}>
              <Image
                style={{
                  resizeMode: 'contain', height: 20, width: 20,
                }}
                source={Back}
              />
            </View>
            <Text style={{
              flex: 8, textAlign: 'left', fontSize: 18, fontFamily: 'cabinet-grotesk-bold', color: '#4A4E4E',
            }}
            >
              DASHBOARD
            </Text>
          </View>
        </Pressable>
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
        <Pressable onPress={navigateToPersonalInformation}>
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
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </View>
        </Pressable>
        <Pressable onPress={navigateToResetPassword}>
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
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </View>
        </Pressable>
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
        <Pressable onPress={navigateToPushNotifs}>

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
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </View>
        </Pressable>
        <Pressable onPress={navigateToContentRecs}>
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
            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </View>
        </Pressable>
        <Pressable onPress={navigateToContentAvoid}>
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

            <Image
              source={Right}
              style={{
                resizeMode: 'contain', height: 20, width: 20, alignSelf: 'flex-end',
              }}
            />
          </View>
        </Pressable>
        <TouchableOpacity
          onPress={handleLogout}
          style={{backgroundColor: '#F7E89C',
            borderRadius: 40,
            paddingVertical: 10,
            paddingHorizontal: 40,
            marginTop: 20,
            width: 258,
            height: 60}}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
