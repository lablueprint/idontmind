import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Landing from '../Features/Feed/Screens/Landing';
import Feed from '../Features/Feed/Screens/Feed';
import Login from '../Features/Feed/Screens/Login';
import CheckIn from '../Features/Feed/Screens/CheckIn';
import Chart from '../Features/Feed/Screens/Chart';
import JournalPage from '../Features/Feed/Screens/JournalPage';
import FindHelp from '../Features/Feed/Screens/FindHelp';

function Misc() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Misc!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator>
        <Tab.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
        <Tab.Screen name="Chart" component={Chart} options={{ headerShown: false }} />
        <Tab.Screen name="Journal" component={JournalPage} options={{ headerShown: false }} />
        <Tab.Screen name="Misc" component={Misc} options={{ headerShown: false }} />
        <Tab.Screen name="Find Help" component={FindHelp} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
