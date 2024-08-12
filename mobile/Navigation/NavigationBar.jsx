import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostSignInLanding from '../Features/Other/Screens/PostSignInLanding';
import Feed from '../Features/Other/Screens/Feed';
import TrendsPage from '../Features/Trends/Screens/TrendsPage';
import Options from '../Features/Options/Options';
import PersonalInfo from '../Features/Options/PersonalInfo';
import ResetPassword from '../Features/Options/ResetPassword';
import PushNotificationsOptions from '../Features/Options/PushNotifications';
import NotificationsTest from '../Features/Options/NotificationsTest';
import ContentRecs from '../Features/Options/ContentRecs';
import ContentToAvoid from '../Features/Options/ContentToAvoid';
import WOYM from '../Features/Onboarding/Screens/WOYM';
import DontCareSee from '../Features/Onboarding/Screens/DontCareSee';
import DayChallenge from '../Features/Other/Screens/DayChallenge';
import CompletedChallenges from '../Features/Tutorial/CompletedChallenges'

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen name="PostSignInLanding" component={PostSignInLanding} options={{ headerShown: false }} />
      <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
      <Tab.Screen name="Reset Password" component={ResetPassword} options={{ headerShown: false }} />
      <Tab.Screen name="Trends" component={TrendsPage} options={{ headerShown: true }} />
      <Tab.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
      <Tab.Screen name="DontCareSee" component={DontCareSee} options={{ headerShown: false }} />
      <Tab.Screen name="Old Day Challenge" component={DayChallenge} options={{ headerShown: false }} />
      <Tab.Screen name="CompletedChallenges" component={CompletedChallenges} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}
