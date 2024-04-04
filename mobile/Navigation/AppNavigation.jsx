import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesList from '../Features/ContentLibrary/Screens/Favorites';
import Tag from '../Features/ContentLibrary/Screens/Tag';
import { TagProvider } from '../Features/ContentLibrary/Context/TagContext';
import Landing from '../Features/Other/Screens/Landing';
import Login from '../Features/Onboarding/Screens/Login';
import SignUp from '../Features/Onboarding/Screens/SignUp';
import PersonalInfo from '../Features/Onboarding/Screens/PersonalInfo';
import Customization from '../Features/Onboarding/Screens/Customization';
import NavigationBar from './NavigationBar';
import Filter from '../Features/Other/Screens/Filter';
import BannedTags from '../Features/Other/Screens/BannedTags';
import Splash from '../Features/GettingStarted/Splash';
import Terms from '../Features/GettingStarted/Terms';
import Loading from '../Features/Other/Screens/Loading';
// import PushNotifications from '../Features/Settings/Screens/PushNotifications';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <TagProvider>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerShown: false }} />
          <Stack.Screen name="Customization" component={Customization} options={{ headerShown: false }} />
          <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
          <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
          <Stack.Screen name="BannedTags" component={BannedTags} options={{ headerShown: false }} />
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
          {/* <Stack.Screen name="PushNotifications" component={PushNotifications}
           options={{ headerShown: false }} /> */}
          <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Tag" component={Tag} options={{ headerShown: false }} />
          <Stack.Screen name="Favorites" component={FavoritesList} options={{ headerShown: false }} />
        </Stack.Navigator>
      </TagProvider>
    </NavigationContainer>
  );
}
