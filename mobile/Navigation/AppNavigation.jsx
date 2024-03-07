import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../Features/Other/Screens/Landing';
import Feed from '../Features/Other/Screens/Feed';
import Login from '../Features/Login/Screens/Login';
import SignUp from '../Features/Feed/Screens/SignUp';
import PersonalInfo from '../Features/Feed/Screens/PersonalInfo';
import Customization from '../Features/Feed/Screens/Customization';
import NavigationBar from './NavigationBar';
import CheckIn from '../Features/CheckIn/CheckIn';
import Sleep from '../Features/CheckIn/Sleep';
import Mood from '../Features/CheckIn/Mood';
import AddMood from '../Features/CheckIn/AddMood';
import AddColor from '../Features/CheckIn/AddColor';
import Filter from '../Features/Other/Screens/Filter';
import BannedTags from '../Features/Other/Screens/BannedTags';
import EndCheckIn from '../Features/CheckIn/EndCheckIn';
import PushNotifications from '../Features/Settings/Screens/PushNotifications';
import Loading from '../Features/Register/Loading';
import JournalPage from '../Features/Journal/Screens/JournalPage';
import Activity from '../Features/CheckIn/Activity';
import AddActivity from '../Features/CheckIn/AddActivity';
import AddIcon from '../Features/CheckIn/AddIcon';
import Feeling from '../Features/CheckIn/Feeling';

const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerShown: false }} />
        <Stack.Screen name="Customization" component={Customization} options={{ headerShown: false }} />
        <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
        <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
        <Stack.Screen name="Sleep" component={Sleep} options={{ headerShown: false }} />
        <Stack.Screen name="Feeling" component={Feeling} options={{ headerShown: false }} />
        <Stack.Screen name="Mood" component={Mood} options={{ headerShown: false }} />
        <Stack.Screen name="AddMood" component={AddMood} options={{ headerShown: false }} />
        <Stack.Screen name="AddColor" component={AddColor} options={{ headerShown: false }} />
        <Stack.Screen name="Activity" component={Activity} options={{ headerShown: false }} />
        <Stack.Screen name="AddActivity" component={AddActivity} options={{ headerShown: false }} />
        <Stack.Screen name="AddIcon" component={AddIcon} options={{ headerShown: false }} />
        <Stack.Screen name="EndCheckIn" component={EndCheckIn} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
        <Stack.Screen name="BannedTags" component={BannedTags} options={{ headerShown: false }} />
        <Stack.Screen name="PushNotifications" component={PushNotifications} options={{ headerShown: false }} />
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        <Stack.Screen name="Journal" component={JournalPage} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
