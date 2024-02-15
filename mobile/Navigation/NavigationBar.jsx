import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Landing from '../Features/Other/Screens/Landing';
import Feed from '../Features/Other/Screens/Feed';
import Login from '../Features/Login/Screens/Login';
import CheckInTemplate from '../Features/Other/Screens/CheckInTemplate';
import Trends from '../Features/Other/Screens/Trends';
import CheckIn from '../Features/Other/Screens/CheckIn';
import TrendsPage from '../Trends/Screens/TrendsPage';
import JournalPage from '../Features/Journal/Screens/JournalPage';
import ContentLibrary from '../Features/Other/Screens/ContentLibrary';
import PushNotifications from '../Features/Settings/Screens/PushNotifications';
import FindHelp from '../Features/Other/Screens/FindHelp';
import Options from '../Features/Other/Screens/Options';
import JournalHistoryPage from '../Features/Other/Screens/JournalHistoryPage';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="Trends" component={TrendsPage} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalPage} options={{ headerShown: false }} />
      <Tab.Screen name="Journal History" component={JournalHistoryPage} options={{ headerShown: false }} />
      <Tab.Screen name="Notifs" component={PushNotifications} options={{ headerShown: false }} />
      <Tab.Screen name="Content Library" component={ContentLibrary} options={{ headerShown: false }} />
      <Tab.Screen name="Find Help" component={FindHelp} options={{ headerShown: false }} />
      <Tab.Screen name="Options" component={Options} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
