import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationBar from './NavigationBar';
import Favorites from '../Features/ContentLibrary/Screens/Favorites';
import Tag from '../Features/ContentLibrary/Screens/Tag';
import { TagProvider } from '../Features/ContentLibrary/Context/TagContext';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <TagProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="NavigationBar"
          component={NavigationBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tag"
          component={Tag}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      </TagProvider>      
    </NavigationContainer>
  );
}
