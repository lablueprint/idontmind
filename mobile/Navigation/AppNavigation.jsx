import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../Features/Landing/Screens/Landing';
import Feed from '../Features/Feed/Screens/Feed';
import Login from '../Features/Feed/Screens/Login';
import SignUp from '../Features/Feed/Screens/SignUp';
import PersonalInfo from '../Features/Feed/Screens/PersonalInfo';
import Customization from '../Features/Feed/Screens/Customization';

const Stack = createNativeStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
