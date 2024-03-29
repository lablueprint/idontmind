import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../Features/Other/Screens/Landing';
import Feed from '../Features/Other/Screens/Feed';
import Login from '../Features/Onboarding/Screens/Login';
import SignUp from '../Features/Onboarding/Screens/SignUp';
import PersonalInfo from '../Features/Onboarding/Screens/PersonalInfo';
import Customization from '../Features/Onboarding/Screens/Customization';
import NavigationBar from './NavigationBar';
import Filter from '../Features/Other/Screens/Filter';
import BannedTags from '../Features/Other/Screens/BannedTags';
import PushNotifications from '../Features/Settings/Screens/PushNotifications';
import Loading from '../Features/Register/Loading';

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
        <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
        <Stack.Screen name="BannedTags" component={BannedTags} options={{ headerShown: false }} />
        <Stack.Screen name="PushNotifications" component={PushNotifications} options={{ headerShown: false }} />
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
