import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
        <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
        <Stack.Screen name="BannedTags" component={BannedTags} options={{ headerShown: false }} />
        <Stack.Screen name="PushNotifications" component={PushNotifications} options={{ headerShown: false }} />
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
