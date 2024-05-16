import PropTypes from 'prop-types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../redux/authSlice';
import FavoritesList from '../Features/ContentLibrary/Screens/Favorites';
import Tag from '../Features/ContentLibrary/Screens/Tag';
import { TagProvider } from '../Features/ContentLibrary/Context/TagContext';
import Landing from '../Features/Other/Screens/Landing';
import Login from '../Features/Onboarding/Screens/Login';
import SignUp from '../Features/Onboarding/Screens/SignUp';
import PersonalInfo from '../Features/Onboarding/Screens/PersonalInfo';
import Customization from '../Features/Onboarding/Screens/Customization';
import NavigationBar from './NavigationBar';
import AltNavigationBar from './AltNavigationBar';
import Filter from '../Features/Other/Screens/Filter';
import BannedTags from '../Features/Other/Screens/BannedTags';
import Splash from '../Features/GettingStarted/Splash';
import Terms from '../Features/GettingStarted/Terms';
import Loading from '../Features/Register/Loading';
import Overview from '../Features/Tutorial/Overview';
import TutorialCheckIn1 from '../Features/Tutorial/TutorialCheckIn1';
import TutorialCheckIn2 from '../Features/Tutorial/TutorialCheckIn2';
import Personalization from '../Features/Tutorial/Personalization';
import MoreResources from '../Features/Tutorial/MoreResources';
import WrapUp from '../Features/Tutorial/WrapUp';
import ThirtyDayOverview from '../Features/Tutorial/ThirtyDayOverview';
import TrendsTab from '../Trends/Components/Trends';
import TrendsBody from '../Trends/Screens/TrendsBody';

import CheckIn from '../Features/CheckIn/CheckIn';
import JournalDetails from '../Features/Journal/Screens/JournalDetails';
import Sleep from '../Features/CheckIn/Sleep';
import Mood from '../Features/CheckIn/Mood';
import AddMood from '../Features/CheckIn/AddMood';
import AddColor from '../Features/CheckIn/AddColor';
import Activity from '../Features/CheckIn/Activity';
import AddActivity from '../Features/CheckIn/AddActivity';
import AddIcon from '../Features/CheckIn/AddIcon';
import Feeling from '../Features/CheckIn/Feeling';
import EndCheckIn from '../Features/CheckIn/EndCheckIn';

// import PushNotifications from '../Features/Settings/Screens/PushNotifications';
// temporary until Kenny's sprint:
import Exercise from '../Features/CheckIn/Exercise';

const Stack = createStackNavigator();

export default function AppNavigation({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const popRedux = () => {
    console.log(user);
    if (!user) {
      return;
    }
    dispatch(login(JSON.parse(user)));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    popRedux();
  }, [user]);

  if (isLoading) {
    return (<Loading />);
  }

  return (
    <NavigationContainer>
      <TagProvider>
        <Stack.Navigator>
          { user ? (
            <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{ headerShown: false }} />
          <Stack.Screen name="Customization" component={Customization} options={{ headerShown: false }} />
          { user ? (
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="NavigationBar" component={NavigationBar} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
          <Stack.Screen name="BannedTags" component={BannedTags} options={{ headerShown: false }} />
          <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
          <Stack.Screen name="Trends" component={TrendsTab} options={{ headerShown: false }} />
          <Stack.Screen name="TrendsBody" component={TrendsBody} options={{ headerShown: false }} />
          <Stack.Screen name="AltNavigationBar" component={AltNavigationBar} options={{ headerShown: false }} />
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
          <Stack.Screen name="TutorialCheckIn1" component={TutorialCheckIn1} options={{ headerShown: false }} />
          <Stack.Screen name="TutorialCheckIn2" component={TutorialCheckIn2} options={{ headerShown: false }} />
          <Stack.Screen name="Personalization" component={Personalization} options={{ headerShown: false }} />
          <Stack.Screen name="MoreResources" component={MoreResources} options={{ headerShown: false }} />
          <Stack.Screen name="WrapUp" component={WrapUp} options={{ headerShown: false }} />
          <Stack.Screen name="ThirtyDayOverview" component={ThirtyDayOverview} options={{ headerShown: false }} />
          {/* <Stack.Screen name="PushNotifications" component={PushNotifications}
           options={{ headerShown: false }} /> */}
          <Stack.Screen name="Overview" component={Overview} options={{ headerShown: false }} />
          <Stack.Screen name="Tag" component={Tag} options={{ headerShown: false }} />
          <Stack.Screen name="Favorites" component={FavoritesList} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Sleep" component={Sleep} options={{ headerShown: false }} />
          <Stack.Screen name="Feeling" component={Feeling} options={{ headerShown: false }} />
          <Stack.Screen name="Mood" component={Mood} options={{ headerShown: false }} />
          <Stack.Screen name="AddMood" component={AddMood} options={{ headerShown: false }} />
          <Stack.Screen name="AddColor" component={AddColor} options={{ headerShown: false }} />
          <Stack.Screen name="Activity" component={Activity} options={{ headerShown: false }} />
          <Stack.Screen name="AddActivity" component={AddActivity} options={{ headerShown: false }} />
          <Stack.Screen name="AddIcon" component={AddIcon} options={{ headerShown: false }} />
          <Stack.Screen name="EndCheckIn" component={EndCheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
          <Stack.Screen name="JournalDetails" component={JournalDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
      </TagProvider>
    </NavigationContainer>
  );
}

AppNavigation.propTypes = {
  user: PropTypes.string,
};

AppNavigation.defaultProps = {
  user: null,
};
