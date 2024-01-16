import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Login';
import Landing from '../../Landing/Screens/Landing';
import CheckIn from './CheckIn';
import Feed from './Feed';
import Chart from './Chart';

function Misc() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Empty Screen 1!</Text>
    </View>
  );
}

function Other() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Other Empty Screen!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator>

        <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Tab.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
        <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Tab.Screen name="Chart" component={Chart} />
        <Tab.Screen name="Other" component={Other} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
