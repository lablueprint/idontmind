import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Image, ImageBackground, View, Dimensions,
} from 'react-native';
import TrendsPage from '../Features/Trends/Screens/TrendsPage';

import JournalTabs from '../Features/Journal/Screens/JournalPage';
import ContentDashboard from '../Features/Other/Screens/ContentDashboard';
import ContentLibrary from '../Features/ContentLibrary/Screens/ContentLibrary';
import FindHelp from '../Features/Other/Screens/FindHelp';
import CalendarPage from '../Features/Other/Screens/Calendar';

import TrendsIcon from '../assets/navbaricons/trendsicon.png';
import JournalIcon from '../assets/navbaricons/journalicon.png';
import HomeIcon from '../assets/navbaricons/homeicon.png';
import ContentIcon from '../assets/navbaricons/contenticon.png';
import FindHelpIcon from '../assets/navbaricons/findhelpicon.png';
import BlackCircle from '../assets/navbaricons/blackcircle.png';

import Options from '../Features/Options/Options';
import PersonalInfo from '../Features/Options/PersonalInfo';
import PushNotificationsOptions from '../Features/Options/PushNotifications';
import ResetPassword from '../Features/Options/ResetPassword';
// import Options from '../Features/Other/Screens/Options';

import ThirtyDayOverview from '../Features/Tutorial/ThirtyDayOverview';
import ThirtyDayChallenge from '../Features/Tutorial/ThirtyDayChallenge';

import Bookmarks from '../Features/ContentLibrary/Screens/Bookmarks';
import BookmarksEdgeCase from '../Features/ContentLibrary/Screens/BookmarksEdgeCase';
import Resource from '../Features/ContentLibrary/Screens/Resource';
import ResourceList from '../Features/ContentLibrary/Screens/ResourceList';
import Tag from '../Features/ContentLibrary/Screens/Tag';
import ContentRecs from '../Features/Options/ContentRecs';
import ContentToAvoid from '../Features/Options/ContentToAvoid';
import FolderContent from '../Features/ContentLibrary/Screens/FolderContent';
import NotificationsTest from '../Features/Options/NotificationsTest';

const Stack = createStackNavigator();
const otherNames = ['Detox', 'ThirtyDayChallenge', 'Options', 'Personal Info', 'Push Notifications Options', 'Reset Password',
  'Content Recs', 'Content To Avoid'];
const otherPages = [ThirtyDayOverview, ThirtyDayChallenge,
  Options, PersonalInfo, NotificationsTest, ResetPassword,
  ContentRecs, ContentToAvoid];

function HomeWithExtraPages() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Content Dashboard"
        component={ContentDashboard}
        options={{
          headerShown: false,
        }}
      />
      { [...Array(otherNames.length).keys()].map((i) => (
        <Stack.Screen
          key={otherNames[i]}
          name={otherNames[i]}
          component={otherPages[i]}
          options={{
            headerShown: false,
          }}
        />
      )) }
    </Stack.Navigator>
  );
}
const contentNames = ['Bookmarks', 'Bookmarks Edge Case', 'Resource', 'Resource List', 'Tag', 'FolderContent'];
const contentPages = [Bookmarks, BookmarksEdgeCase, Resource, ResourceList, Tag, FolderContent];
function ContentLibraryWithExtraPages() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Content Library"
        component={ContentLibrary}
        options={{
          headerShown: false,
        }}
      />
      { [...Array(contentNames.length).keys()].map((i) => (
        <Stack.Screen
          key={contentNames[i]}
          name={contentNames[i]}
          component={contentPages[i]}
          options={{
            headerShown: false,
          }}
        />
      )) }
    </Stack.Navigator>
  );
}

function JournalCalendar() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        key="Journal Tabs"
        name="Journal Tabs"
        component={JournalTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        key="Calendar Screen"
        name="Calendar Screen"
        component={CalendarPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AltNavigationBar() {
  const Tab = createBottomTabNavigator();

  const names = ['Trends', 'Journal', 'Home', 'Content', 'Find Help'];
  const icons = [TrendsIcon, JournalIcon, HomeIcon, ContentIcon, FindHelpIcon];
  const components = [TrendsPage, JournalCalendar, HomeWithExtraPages,
    ContentLibraryWithExtraPages, FindHelp];

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
          key={names[i]}
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
