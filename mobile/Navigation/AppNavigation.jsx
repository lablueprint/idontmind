import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './NavigationBar';
import Filter from '../Features/Other/Screens/Filter';
import ContentRecs from '../Features/Other/Screens/ContentRecs';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
        <Stack.Screen name="ContentRecs" component={ContentRecs} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
