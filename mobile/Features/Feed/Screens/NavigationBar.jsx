import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Landing from './Landing';
import Feed from './Feed';
import Login from './Login';
import CheckIn from './CheckIn';
import Chart from './Chart';
import JournalPage from './JournalPage';

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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
