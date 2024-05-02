import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import CheckIn from '../Features/Other/Screens/CheckIn';
import TrendsPage from '../Trends/Screens/TrendsPage';
// import JournalPage from '../Features/Journal/Screens/JournalPage';
import JournalTabs from '../Features/Journal/Screens/JournalPage';
import JournalPage from '../Features/Journal/Screens/JournalPage';
import ContentLibrary from '../Features/ContentLibrary/Screens/ContentLibrary';
import PushNotifications from '../Features/Settings/Screens/PushNotifications';
import FindHelp from '../Features/Other/Screens/FindHelp';
import Options from '../Features/Other/Screens/Options';
import Calendar from '../Features/Other/Screens/Calendar';
// import JournalHistoryPage from '../Features/Other/Screens/JournalHistoryPage';
import WOYM from '../Features/Register/WOYM';
import DayChallenge from '../Features/Other/Screens/DayChallenge';
import ContentDashboard from '../Features/Other/Screens/ContentDashboard';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="Trends" component={TrendsPage} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalTabs} options={{ headerShown: false }} />
      <Tab.Screen name="Journal2" component={JournalPage} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Content Library" component={ContentLibrary} options={{ headerShown: false }} /> */}
      <Tab.Screen name="Find Help" component={FindHelp} options={{ headerShown: false }} />
      <Tab.Screen name="Notifs" component={PushNotifications} options={{ headerShown: false }} />
      <Tab.Screen name="Options" component={Options} options={{ headerShown: false }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
      <Tab.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
      <Tab.Screen name="Day Challenge" component={DayChallenge} options={{ headerShown: false }} />
      <Tab.Screen name="Content Dashboard" component={ContentDashboard} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
