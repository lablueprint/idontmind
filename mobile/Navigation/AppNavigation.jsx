import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationBar from '../Features/Feed/Screens/NavigationBar';

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <NavigationBar />
    </NavigationContainer>
  );
}
