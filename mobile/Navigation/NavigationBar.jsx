import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Landing from '../Features/Feed/Screens/Landing';
import Feed from '../Features/Feed/Screens/Feed';
import Login from '../Features/Login/Screens/Login';
import CheckIn from '../Features/Feed/Screens/CheckIn';
import Trends from '../Features/Feed/Screens/Trends';
import JournalPage from '../Features/Journal/Screens/JournalPage';
import ContentLibrary from '../Features/Feed/Screens/ContentLibrary';
import PushNotifications from '../Features/Settings/Screens/PushNotifications';
import FindHelp from '../Features/Feed/Screens/FindHelp';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
        <Tab.Screen name="Trends" component={Trends} options={{ headerShown: false }} />
        <Tab.Screen name="Journal" component={JournalPage} options={{ headerShown: false }} />
        <Tab.Screen name="Notifs" component={PushNotifications} options={{ headerShown: false }} />
        <Tab.Screen name="Content Library" component={ContentLibrary} options={{ headerShown: false }} />
        <Tab.Screen name="Find Help" component={FindHelp} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
