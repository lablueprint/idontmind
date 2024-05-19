import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import CheckIn from '../Features/CheckIn/CheckIn';
import PushNotifications from '../Features/Settings/Screens/PushNotifications';
import Options from '../Features/Options/Options';
import JournalHistoryPage from '../Features/Other/Screens/JournalHistoryPage';
import WOYM from '../Features/Register/WOYM';
import DayChallenge from '../Features/Other/Screens/DayChallenge';
import PersonalInfo from '../Features/Options/PersonalInfo';
import ResetPassword from '../Features/Options/ResetPassword';
import PushNotificationsOptions from '../Features/Options/PushNotifications';
import ContentRecs from '../Features/Options/ContentRecs';
import ContentToAvoid from '../Features/Options/ContentToAvoid';

import ContentDashboard from '../Features/Other/Screens/ContentDashboard';
import Bookmarks from '../Features/ContentLibrary/Screens/Bookmarks';
import BookmarksEdgeCase from '../Features/ContentLibrary/Screens/BookmarksEdgeCase';
import Resource from '../Features/ContentLibrary/Screens/Resource';
import ResourceList from '../Features/ContentLibrary/Screens/ResourceList';
import Tag from '../Features/ContentLibrary/Screens/Tag';
import ContentLibrary from '../Features/ContentLibrary/Screens/ContentLibrary';

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
      <Tab.Screen name="Personal Info" component={PersonalInfo} options={{ headerShown: false }} />
      <Tab.Screen name="Push Notifications Options" component={PushNotificationsOptions} options={{ headerShown: false }} />
      <Tab.Screen name="Reset Password" component={ResetPassword} options={{ headerShown: false }} />
      <Tab.Screen name="Content Recs" component={ContentToAvoid} options={{ headerShown: false }} />
      <Tab.Screen name="Content To Avoid" component={ContentRecs} options={{ headerShown: false }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
      <Tab.Screen name="Content Dashboard" component={ContentDashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Content Library" component={ContentLibrary} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks Edge Case" component={BookmarksEdgeCase} options={{ headerShown: false }} />
      <Tab.Screen name="Resource" component={Resource} options={{ headerShown: false }} />
      <Tab.Screen name="Resource List" component={ResourceList} options={{ headerShown: false }} />
      <Tab.Screen name="Tag" component={Tag} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}
