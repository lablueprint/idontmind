import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import CheckIn from '../Features/Other/Screens/CheckIn';
import PushNotifications from '../Features/Settings/Screens/PushNotifications';
import Options from '../Features/Other/Screens/Options';
import JournalHistoryPage from '../Features/Other/Screens/JournalHistoryPage';
import WOYM from '../Features/Register/WOYM';
import DayChallenge from '../Features/Other/Screens/DayChallenge';
import ContentDashboard from '../Features/Other/Screens/ContentDashboard';
import Bookmarks from '../Features/ContentLibrary/Screens/Bookmarks';
import BookmarksEdgeCase from '../Features/ContentLibrary/Screens/BookmarksEdgeCase';
import Resource from '../Features/ContentLibrary/Screens/Resource';
import ResourceList from '../Features/ContentLibrary/Screens/ResourceList';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="Journal History" component={JournalHistoryPage} options={{ headerShown: false }} />
      <Tab.Screen name="Notifs" component={PushNotifications} options={{ headerShown: false }} />
      <Tab.Screen name="Options" component={Options} options={{ headerShown: false }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
      <Tab.Screen name="Day Challenge" component={DayChallenge} options={{ headerShown: false }} />
      <Tab.Screen name="Content Dashboard" component={ContentDashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks Edge Case" component={BookmarksEdgeCase} options={{ headerShown: false }} />
      <Tab.Screen name="Resource" component={Resource} options={{ headerShown: false }} />
      <Tab.Screen name="Resource List" component={ResourceList} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}
