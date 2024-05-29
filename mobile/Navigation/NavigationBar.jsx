import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import CheckIn from '../Features/CheckIn/CheckIn';
import WOYM from '../Features/Register/WOYM';
import NotificationsTest from '../Features/Settings/Screens/NotificationsTest';
import ContentDashboard from '../Features/Other/Screens/ContentDashboard';
import Bookmarks from '../Features/ContentLibrary/Screens/Bookmarks';
import BookmarksEdgeCase from '../Features/ContentLibrary/Screens/BookmarksEdgeCase';
import Resource from '../Features/ContentLibrary/Screens/Resource';
import ResourceList from '../Features/ContentLibrary/Screens/ResourceList';
import ContentLibrary from '../Features/ContentLibrary/Screens/ContentLibrary';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications Test" component={NotificationsTest} options={{ headerShown: false }} />
      <Tab.Screen name="Content Dashboard" component={ContentDashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Content Library" component={ContentLibrary} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks Edge Case" component={BookmarksEdgeCase} options={{ headerShown: false }} />
      <Tab.Screen name="Resource" component={Resource} options={{ headerShown: false }} />
      <Tab.Screen name="Resource List" component={ResourceList} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}
