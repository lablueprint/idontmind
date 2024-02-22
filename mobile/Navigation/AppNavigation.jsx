import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './NavigationBar';
import CheckIn from '../Features/CheckIn/CheckIn';
import Sleep from '../Features/CheckIn/Sleep';
import Mood from '../Features/CheckIn/Mood';
import AddMood from '../Features/CheckIn/AddMood';
import AddColor from '../Features/CheckIn/AddColor';
import Filter from '../Features/Other/Screens/Filter';
import BannedTags from '../Features/Other/Screens/BannedTags';
import EndCheckIn from '../Features/CheckIn/EndCheckIn';

function Misc() {
  return (
    <View>
      Test
    </View>
  );
}

const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
        <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
        <Stack.Screen name="Sleep" component={Sleep} options={{ headerShown: false }} />
        <Stack.Screen name="Mood" component={Mood} options={{ headerShown: false }} />
        <Stack.Screen name="AddMood" component={AddMood} options={{ headerShown: false }} />
        <Stack.Screen name="AddColor" component={AddColor} options={{ headerShown: false }} />
        <Stack.Screen name="EndCheckIn" component={EndCheckIn} options={{ headerShown: false }} />
        <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
        <Stack.Screen name="BannedTags" component={BannedTags} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
