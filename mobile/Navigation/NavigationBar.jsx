import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import Calendar from '../Features/Other/Screens/Calendar';
import TrendsPage from '../Features/Trends/Screens/TrendsPage';
import CheckIn from '../Features/CheckIn/CheckIn';
import WOYM from '../Features/Onboarding/Screens/WOYM';
import DontCareSee from '../Features/Onboarding/Screens/DontCareSee';
import ContentDashboard from '../Features/Other/Screens/ContentDashboard';
import Bookmarks from '../Features/ContentLibrary/Screens/Bookmarks';
import BookmarksEdgeCase from '../Features/ContentLibrary/Screens/BookmarksEdgeCase';
import Resource from '../Features/ContentLibrary/Screens/Resource';
import ResourceList from '../Features/ContentLibrary/Screens/ResourceList';
import DayChallenge from '../Features/Other/Screens/DayChallenge';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
      <Tab.Screen name="Trends" component={TrendsPage} options={{ headerShown: true }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
      <Tab.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
      <Tab.Screen name="Day Challenge" component={DayChallenge} options={{ headerShown: false }} />
      <Tab.Screen name="Content Dashboard" component={ContentDashboard} options={{ headerShown: false }} />
      <Tab.Screen name="DontCareSee" component={DontCareSee} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={{ headerShown: false }} />
      <Tab.Screen name="Bookmarks Edge Case" component={BookmarksEdgeCase} options={{ headerShown: false }} />
      <Tab.Screen name="Resource" component={Resource} options={{ headerShown: false }} />
      <Tab.Screen name="Resource List" component={ResourceList} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
