import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image, ImageBackground, View, Dimensions,
} from 'react-native';
import TrendsPage from '../Trends/Screens/TrendsPage';
import JournalPage from '../Features/Journal/Screens/JournalPage';
import ContentDashboard from '../Features/Other/Screens/ContentDashboard';
import ContentLibrary from '../Features/ContentLibrary/Screens/ContentLibrary';
import FindHelp from '../Features/Other/Screens/FindHelp';
import TrendsIcon from '../assets/navbaricons/trendsicon.png';
import JournalIcon from '../assets/navbaricons/journalicon.png';
import HomeIcon from '../assets/navbaricons/homeicon.png';
import ContentIcon from '../assets/navbaricons/contenticon.png';
import FindHelpIcon from '../assets/navbaricons/findhelpicon.png';
import BlackCircle from '../assets/navbaricons/blackcircle.png';

const Tab = createBottomTabNavigator();

export default function AltNavigationBar() {
  const names = ['Trends', 'Journal', 'Home', 'Content', 'Find Help'];
  const icons = [TrendsIcon, JournalIcon, HomeIcon, ContentIcon, FindHelpIcon];
  const components = [TrendsPage, JournalPage, ContentDashboard, ContentLibrary, FindHelp];

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route, navigation }) => ({
        tabBarLabel: navigation.isFocused() ? route.name : '',
        tabBarStyle: {
          height: Dimensions.get('window').height / 10,
          backgroundColor: 'rgba(210, 228, 227, 1)',
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
          component={components[i]}
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
                      // flex: 1,
                      width: Dimensions.get('window').height / 11,
                      height: Dimensions.get('window').height / 11,
                    }}
                  >
                    <ImageBackground
                      source={BlackCircle}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      >
                        <Image
                          tintColor="white"
                          source={icons[i]}
                          style={{ width: Dimensions.get('window').height / 25, height: Dimensions.get('window').height / 25 }}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                )
                : (
                  <View
                    style={{ marginTop: '30%' }}
                  >
                    <Image
                      style={{ width: size, height: size }}
                      source={icons[i]}
                    />
                  </View>
                )
            ),
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
