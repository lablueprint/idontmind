import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import TrendsPage from '../Features/Trends/Screens/TrendsPage';
import JournalTabs from '../Features/Journal/Screens/JournalPage';
import CheckIn from '../Features/CheckIn/CheckIn';
// import PushNotifications from '../Features/Settings/Screens/PushNotifications';
// import Options from '../Features/Other/Screens/Options';
// import JournalHistoryPage from '../Features/Other/Screens/JournalHistoryPage';
import WOYM from '../Features/Onboarding/Screens/WOYM';
import DontCareSee from '../Features/Onboarding/Screens/DontCareSee';

import Bookmarks from '../Features/ContentLibrary/Screens/Bookmarks';
import BookmarksEdgeCase from '../Features/ContentLibrary/Screens/BookmarksEdgeCase';
import Resource from '../Features/ContentLibrary/Screens/Resource';
import ResourceList from '../Features/ContentLibrary/Screens/ResourceList';
// import Tag from '../Features/ContentLibrary/Screens/Tag';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="Trends" component={TrendsPage} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalTabs} options={{ headerShown: false }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
      <Tab.Screen name="DontCareSee" component={DontCareSee} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks Edge Case" component={BookmarksEdgeCase} options={{ headerShown: false }} />
      <Tab.Screen name="Resource" component={Resource} options={{ headerShown: false }} />
      <Tab.Screen name="Resource List" component={ResourceList} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}
