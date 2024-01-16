import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from '../../Landing/Screens/Landing';
import Feed from './Feed';
import CheckIn from './CheckIn';

function FourthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen 4!</Text>
    </View>
  );
}

function FifthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen 5!</Text>
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
        <Tab.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />

        <Tab.Screen name="Screen 4" component={FourthScreen} />
        <Tab.Screen name="Screen 5" component={FifthScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
