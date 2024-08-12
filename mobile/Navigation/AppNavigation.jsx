import PropTypes from 'prop-types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from '../redux/authSlice';
import FavoritesList from '../Features/ContentLibrary/Screens/Favorites';
import { TagProvider } from '../Features/ContentLibrary/Context/TagContext';
import Landing from '../Features/Other/Screens/Landing';
import Login from '../Features/Onboarding/Screens/Login';
import SignUp from '../Features/Onboarding/Screens/SignUp';
import PersonalInfo from '../Features/Onboarding/Screens/PersonalInfo';
import NavigationBar from './NavigationBar';
import AltNavigationBar from './AltNavigationBar';
import Filter from '../Features/Other/Screens/Filter';
import BannedTags from '../Features/Other/Screens/BannedTags';
import Splash from '../Features/GettingStarted/Splash';
import Terms from '../Features/GettingStarted/Terms';
import Loading from '../Features/Onboarding/Screens/Loading';
import DontCareSee from '../Features/Onboarding/Screens/DontCareSee';
import WOYM from '../Features/Onboarding/Screens/WOYM';
import Overview from '../Features/Tutorial/Overview';
import TutorialCheckIn1 from '../Features/Tutorial/TutorialCheckIn1';
import CheckinOptional from '../Features/Tutorial/CheckinOptional';
import TutorialCheckIn2 from '../Features/Tutorial/TutorialCheckIn2';
import Personalization from '../Features/Tutorial/Personalization';
import MoreResources from '../Features/Tutorial/MoreResources';
import WrapUp from '../Features/Tutorial/WrapUp';
import ThirtyDayOverview from '../Features/Tutorial/ThirtyDayOverview';
import ForgotPassword from '../Features/Login/Screens/ForgotPassword';
import TokenInput from '../Features/Login/Screens/TokenInput';
import ResetPassword from '../Features/Login/Screens/ResetPassword';
import TrendsTab from '../Features/Trends/Components/Trends';
import TrendsBody from '../Features/Trends/Screens/TrendsBody';
import ThirtyDayChallenge from '../Features/Tutorial/ThirtyDayChallenge';

import JournalDetails from '../Features/Journal/Screens/JournalDetails';
import PostDetails from '../Features/Journal/Screens/PostDetails';

import CheckIn from '../Features/CheckIn/CheckIn';
import Sleep from '../Features/CheckIn/Sleep';
import Mood from '../Features/CheckIn/Mood';
import AddMood from '../Features/CheckIn/AddMood';
import AddColor from '../Features/CheckIn/AddColor';
import Activity from '../Features/CheckIn/Activity';
import AddActivity from '../Features/CheckIn/AddActivity';
import AddIcon from '../Features/CheckIn/AddIcon';
import PreFeeling from '../Features/CheckIn/PreFeeling';
import Feeling from '../Features/CheckIn/Feeling';
import Energy from '../Features/CheckIn/Energy';
import Water from '../Features/CheckIn/Water';
import Meal from '../Features/CheckIn/Meal';
import EndCheckIn from '../Features/CheckIn/EndCheckIn';
import Exercise from '../Features/CheckIn/Exercise';

import FindHelp from '../Features/Other/Screens/FindHelp';

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
          <Stack.Screen name="DontCareSee" component={DontCareSee} options={{ headerShown: false }} />
          <Stack.Screen name="WOYM" component={WOYM} options={{ headerShown: false }} />
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
          <Stack.Screen name="CheckinOptional" component={CheckinOptional} options={{ headerShown: false }} />
          <Stack.Screen name="TutorialCheckIn2" component={TutorialCheckIn2} options={{ headerShown: false }} />
          <Stack.Screen name="Personalization" component={Personalization} options={{ headerShown: false }} />
          <Stack.Screen name="MoreResources" component={MoreResources} options={{ headerShown: false }} />
          <Stack.Screen name="WrapUp" component={WrapUp} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="TokenInput" component={TokenInput} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
          {/* <Stack.Screen name="ThirtyDayOverview" component={ThirtyDayOverview} options={{ headerShown: false }} />
          <Stack.Screen name="ThirtyDayChallenge" component={ThirtyDayChallenge} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="PushNotifications" component={PushNotifications}
           options={{ headerShown: false }} /> */}
          <Stack.Screen name="Overview" component={Overview} options={{ headerShown: false }} />
          <Stack.Screen name="Favorites" component={FavoritesList} options={{ headerShown: false }} />
          <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Sleep" component={Sleep} options={{ headerShown: false }} />
          <Stack.Screen name="Feeling" component={Feeling} options={{ headerShown: false }} />
          <Stack.Screen name="Pre Feeling" component={PreFeeling} options={{ headerShown: false }} />
          <Stack.Screen name="Energy" component={Energy} options={{ headerShown: false }} />
          <Stack.Screen name="Water" component={Water} options={{ headerShown: false }} />
          <Stack.Screen name="Meal" component={Meal} options={{ headerShown: false }} />
          <Stack.Screen name="Mood" component={Mood} options={{ headerShown: false }} />
          <Stack.Screen name="AddMood" component={AddMood} options={{ headerShown: false }} />
          <Stack.Screen name="AddColor" component={AddColor} options={{ headerShown: false }} />
          <Stack.Screen name="Activity" component={Activity} options={{ headerShown: false }} />
          <Stack.Screen name="AddActivity" component={AddActivity} options={{ headerShown: false }} />
          <Stack.Screen name="AddIcon" component={AddIcon} options={{ headerShown: false }} />
          <Stack.Screen name="EndCheckIn" component={EndCheckIn} options={{ headerShown: false }} />
          <Stack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
          <Stack.Screen name="JournalDetails" component={JournalDetails} options={{ headerShown: false }} />
          <Stack.Screen name="FindHelp" component={FindHelp} options={{ headerShown: false }} />
          <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }} />
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
