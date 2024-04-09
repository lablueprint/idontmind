import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image, ImageBackground, View, Dimensions,
} from 'react-native';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import TrendsIcon from '../assets/navbaricons/trendsicon.png';
import JournalIcon from '../assets/navbaricons/journalicon.png';
import HomeIcon from '../assets/navbaricons/homeicon.png';
import ContentIcon from '../assets/navbaricons/contenticon.png';
import FindHelpIcon from '../assets/navbaricons/findhelpicon.png';
import GreenCircle from '../assets/navbaricons/greencircle.png';

const Tab = createBottomTabNavigator();

export default function AltNavigationBar() {
  const names = ['Trends', 'Journal', 'Home', 'Content', 'Find Help'];
  const icons = [TrendsIcon, JournalIcon, HomeIcon, ContentIcon, FindHelpIcon];

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route, navigation }) => ({
        tabBarLabel: navigation.isFocused() ? route.name.toUpperCase() : '',
        tabBarStyle: {
          height: Dimensions.get('window').height / 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: 'black',
        },
      })}
    >
      {[...Array(5).keys()].map((i) => (
        <Tab.Screen
          name={names[i]}
          component={PostSignInLanding}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ size, focused }) => (
              focused
                ? (
                  <View
                    style={{
                      bottom: Dimensions.get('window').height / 34,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('window').height / 11,
                      height: Dimensions.get('window').height / 11,
                    }}
                  >
                    <ImageBackground
                      source={GreenCircle}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        marginTop: Dimensions.get('window').height / 10,
                      }}
                    >
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      >
                        <Image
                          source={icons[i]}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                )
                : (
                  <Image
                    style={{ width: size, height: size }}
                    source={icons[i]}
                  />
                )
            ),
          }}
        />
      ))}
      {/* <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="Trends" component={TrendsPage} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalPage} options={{ headerShown: false }} />
      <Tab.Screen name="Journal History" component={JournalHistoryPage} options={{ headerShown: false }} />
      <Tab.Screen name="Notifs" component={PushNotifications} options={{ headerShown: false }} />
      <Tab.Screen name="Content Library" component={ContentLibrary} options={{ headerShown: false }} />
      <Tab.Screen name="Find Help" component={FindHelp} options={{ headerShown: false }} />
      <Tab.Screen name="Options" component={Options} options={{ headerShown: false }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} /> */}

      {/* <Tab.Screen name="Trends" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Journal" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Content" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Find Help" component={PostSignInLanding} options={{ headerShown: false }} /> */}
    </Tab.Navigator>
  );
}
