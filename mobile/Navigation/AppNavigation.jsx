import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../Features/Landing/Screens/Landing';
import Feed from '../Features/Feed/Screens/Feed';
import Login from '../Features/Feed/Screens/Login';
import Chart from '../Features/Feed/Screens/Chart';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Chart" component={Chart} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
