import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import CheckIn from '../Features/Other/Screens/CheckIn';
import TrendsPage from '../Trends/Screens/TrendsPage';
import JournalPage from '../Features/Journal/Screens/JournalPage';
import ContentLibrary from '../Features/Other/Screens/ContentLibrary';
import FindHelp from '../Features/Other/Screens/FindHelp';
import Options from '../Features/Other/Screens/Options';
import JournalHistoryPage from '../Features/Other/Screens/JournalHistoryPage';
import WOYM from '../Features/Register/WOYM';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="Trends" component={TrendsPage} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalPage} options={{ headerShown: false }} />
      <Tab.Screen name="Journal History" component={JournalHistoryPage} options={{ headerShown: false }} />
      <Tab.Screen name="Content Library" component={ContentLibrary} options={{ headerShown: false }} />
      <Tab.Screen name="Find Help" component={FindHelp} options={{ headerShown: false }} />
      <Tab.Screen name="Options" component={Options} options={{ headerShown: false }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
