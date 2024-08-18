import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Asset } from 'expo-asset';
import AppNavigation from './Navigation/AppNavigation';
import store from './redux/store';
import Loading from './Features/Onboarding/Screens/Loading';

import gear from './assets/images/gear.png';
import lilSun from './assets/images/lilSun.png';
import bookmarkBlue from './assets/images/bookmark_blue.png';
import science from './assets/images/science.png';
import icon from './assets/images/icon.png';
import calendarbackground from './assets/images/calendarbackground.png';
import crylilguy from './assets/images/crylilguy.png';
import rightChevron from './assets/images/rightChevron.png';
import iterate from './assets/images/iterate.png';
import packageicon from './assets/images/packageicon.png';
import timeLine from './assets/images/time_line.png';
import SMASHTHATBELL from './assets/images/SMASHTHATBELL.png';
import sleep from './assets/images/sleep.png';
import normallilguy from './assets/images/normallilguy.png';
import folderIcon from './assets/images/folderIcon.png';
import dot from './assets/images/dot.png';
import chevronUp from './assets/images/chevron-up.png';
import noBookmarks from './assets/images/noBookmarks.png';
import energy from './assets/images/energy.png';
import folderDark from './assets/images/folder_dark.png';
import clear from './assets/images/clear.png';
import smilinglilguy from './assets/images/smilinglilguy.png';
import bolt3 from './assets/images/bolt3.png';
import bolt2 from './assets/images/bolt2.png';
import puzzle from './assets/images/puzzle.png';
import cancel from './assets/images/cancel.png';
import bolt0 from './assets/images/bolt0.png';
import bolt1 from './assets/images/bolt1.png';
import standing from './assets/images/standing.png';
import tagFill from './assets/images/tag_fill.png';
import home from './assets/images/home.png';
import bolt5 from './assets/images/bolt5.png';
import arrow from './assets/images/arrow.png';
import account from './assets/images/account.png';
import bolt4 from './assets/images/bolt4.png';
import idontmindlogo from './assets/images/idontmindlogo.png';
import bookmarkDark from './assets/images/bookmark_dark.png';
import shape from './assets/images/shape.png';
import search from './assets/images/search.png';
import alarm from './assets/images/alarm.png';
import colorSquare from './assets/images/colorSquare.png';
import walking from './assets/images/walking.png';
import left from './assets/images/left.png';
import favicon from './assets/images/favicon.png';
import splash from './assets/images/splash.png';
import food from './assets/images/food.png';
import adaptiveIcon from './assets/images/adaptive-icon.png';
import bookmark from './assets/images/bookmark.png';
import goldStar from './assets/images/goldStar.png';
import water from './assets/images/water.png';
import filter from './assets/images/filter.png';
import greenCheck from './assets/images/green_check.png';
import calendar from './assets/images/calendar.png';
import comment from './assets/images/comment.png';
import happylilguy from './assets/images/happylilguy.png';
import sadlilguy from './assets/images/sadlilguy.png';
import phone from './assets/images/phone.png';
import exercise from './assets/images/exercise.png';
import exit from './assets/images/exit.png';
import backButton from './assets/images/back_button.png';
import reading from './assets/images/reading.png';
import TrendImage from './assets/images/TrendImage.png';
import star from './assets/images/star.png';
import running from './assets/images/running.png';
import Sun from './assets/images/Sun.png';
import bookmarkFill from './assets/images/bookmark_fill.png';
import backArrow from './assets/images/backArrow.png';
import security from './assets/images/security.png';
import contentbackground from './assets/images/contentbackground.png';
import reward from './assets/images/reward.png';
import chat from './assets/images/chat.png';
import flipicon from './assets/images/flipicon.png';
import sleepFace from './assets/images/sleepFace.png';
import right from './assets/images/right.png';
import addbutton from './assets/images/addbutton.png';

import homeicon from './assets/navbaricons/homeicon.png';
import greencircle from './assets/navbaricons/greencircle.png';
import blackcircle from './assets/navbaricons/blackcircle.png';
import trendsicon from './assets/navbaricons/trendsicon.png';
import journalicon from './assets/navbaricons/journalicon.png';
import contenticon from './assets/navbaricons/contenticon.png';
import findhelpicon from './assets/navbaricons/findhelpicon.png';

// npx expo run:ios

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'recoleta-black': require('./assets/fonts/Recoleta/Recoleta-Black.ttf'),
        'recoleta-bold': require('./assets/fonts/Recoleta/Recoleta-Bold.ttf'),
        'recoleta-light': require('./assets/fonts/Recoleta/Recoleta-Light.ttf'),
        'recoleta-medium': require('./assets/fonts/Recoleta/Recoleta-Medium.ttf'),
        'recoleta-regular': require('./assets/fonts/Recoleta/Recoleta-Regular.ttf'),
        'recoleta-semibold': require('./assets/fonts/Recoleta/Recoleta-SemiBold.ttf'),
        'recoleta-thin': require('./assets/fonts/Recoleta/Recoleta-Thin.ttf'),
        'recoleta-alt-black': require('./assets/fonts/Recoleta/RecoletaAlt-Black.ttf'),
        'recoleta-alt-bold': require('./assets/fonts/Recoleta/RecoletaAlt-Bold.ttf'),
        'recoleta-alt-light': require('./assets/fonts/Recoleta/RecoletaAlt-Light.ttf'),
        'recoleta-alt-medium': require('./assets/fonts/Recoleta/RecoletaAlt-Medium.ttf'),
        'recoleta-alt-regular': require('./assets/fonts/Recoleta/RecoletaAlt-Regular.ttf'),
        'recoleta-alt-semibold': require('./assets/fonts/Recoleta/RecoletaAlt-SemiBold.ttf'),
        'recoleta-alt-thin': require('./assets/fonts/Recoleta/RecoletaAlt-Thin.ttf'),
        'cabinet-grotesk-black': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Black.otf'),
        'cabinet-grotesk-bold': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Bold.otf'),
        'cabinet-grotesk-extrabold': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Extrabold.otf'),
        'cabinet-grotesk-extralight': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Extralight.otf'),
        'cabinet-grotesk-light': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Light.otf'),
        'cabinet-grotesk-medium': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Medium.otf'),
        'cabinet-grotesk-regular': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Regular.otf'),
        'cabinet-grotesk-thin': require('./assets/fonts/CabinetGrotesk/CabinetGrotesk-Thin.otf'),
        'pinyon-script': require('./assets/fonts/PinyonScript/PinyonScript-Regular.ttf'),
      });
    }

    async function loadImages() {
      Asset.fromModule(gear).downloadAsync();
      Asset.fromModule(lilSun).downloadAsync();
      Asset.fromModule(bookmarkBlue).downloadAsync();
      Asset.fromModule(science).downloadAsync();
      Asset.fromModule(icon).downloadAsync();
      Asset.fromModule(calendarbackground).downloadAsync();
      Asset.fromModule(crylilguy).downloadAsync();
      Asset.fromModule(rightChevron).downloadAsync();
      Asset.fromModule(iterate).downloadAsync();
      Asset.fromModule(packageicon).downloadAsync();
      Asset.fromModule(timeLine).downloadAsync();
      Asset.fromModule(SMASHTHATBELL).downloadAsync();
      Asset.fromModule(sleep).downloadAsync();
      Asset.fromModule(normallilguy).downloadAsync();
      Asset.fromModule(folderIcon).downloadAsync();
      Asset.fromModule(dot).downloadAsync();
      Asset.fromModule(chevronUp).downloadAsync();
      Asset.fromModule(noBookmarks).downloadAsync();
      Asset.fromModule(energy).downloadAsync();
      Asset.fromModule(folderDark).downloadAsync();
      Asset.fromModule(clear).downloadAsync();
      Asset.fromModule(smilinglilguy).downloadAsync();
      Asset.fromModule(bolt3).downloadAsync();
      Asset.fromModule(bolt2).downloadAsync();
      Asset.fromModule(puzzle).downloadAsync();
      Asset.fromModule(cancel).downloadAsync();
      Asset.fromModule(bolt0).downloadAsync();
      Asset.fromModule(bolt1).downloadAsync();
      Asset.fromModule(standing).downloadAsync();
      Asset.fromModule(tagFill).downloadAsync();
      Asset.fromModule(home).downloadAsync();
      Asset.fromModule(bolt5).downloadAsync();
      Asset.fromModule(arrow).downloadAsync();
      Asset.fromModule(account).downloadAsync();
      Asset.fromModule(bolt4).downloadAsync();
      Asset.fromModule(idontmindlogo).downloadAsync();
      Asset.fromModule(bookmarkDark).downloadAsync();
      Asset.fromModule(shape).downloadAsync();
      Asset.fromModule(search).downloadAsync();
      Asset.fromModule(alarm).downloadAsync();
      Asset.fromModule(colorSquare).downloadAsync();
      Asset.fromModule(walking).downloadAsync();
      Asset.fromModule(left).downloadAsync();
      Asset.fromModule(favicon).downloadAsync();
      Asset.fromModule(splash).downloadAsync();
      Asset.fromModule(food).downloadAsync();
      Asset.fromModule(adaptiveIcon).downloadAsync();
      Asset.fromModule(bookmark).downloadAsync();
      Asset.fromModule(goldStar).downloadAsync();
      Asset.fromModule(water).downloadAsync();
      Asset.fromModule(filter).downloadAsync();
      Asset.fromModule(greenCheck).downloadAsync();
      Asset.fromModule(calendar).downloadAsync();
      Asset.fromModule(comment).downloadAsync();
      Asset.fromModule(happylilguy).downloadAsync();
      Asset.fromModule(sadlilguy).downloadAsync();
      Asset.fromModule(phone).downloadAsync();
      Asset.fromModule(exercise).downloadAsync();
      Asset.fromModule(exit).downloadAsync();
      Asset.fromModule(backButton).downloadAsync();
      Asset.fromModule(reading).downloadAsync();
      Asset.fromModule(TrendImage).downloadAsync();
      Asset.fromModule(star).downloadAsync();
      Asset.fromModule(running).downloadAsync();
      Asset.fromModule(Sun).downloadAsync();
      Asset.fromModule(bookmarkFill).downloadAsync();
      Asset.fromModule(backArrow).downloadAsync();
      Asset.fromModule(security).downloadAsync();
      Asset.fromModule(contentbackground).downloadAsync();
      Asset.fromModule(reward).downloadAsync();
      Asset.fromModule(chat).downloadAsync();
      Asset.fromModule(flipicon).downloadAsync();
      Asset.fromModule(sleepFace).downloadAsync();
      Asset.fromModule(right).downloadAsync();
      Asset.fromModule(addbutton).downloadAsync();

      Asset.fromModule(homeicon).downloadAsync();
      Asset.fromModule(greencircle).downloadAsync();
      Asset.fromModule(blackcircle).downloadAsync();
      Asset.fromModule(trendsicon).downloadAsync();
      Asset.fromModule(journalicon).downloadAsync();
      Asset.fromModule(contenticon).downloadAsync();
      Asset.fromModule(findhelpicon).downloadAsync();
    }

    loadFont();
    loadImages();
  }, []);

  const GetUserInformation = async () => {
    setUser(await SecureStore.getItemAsync('user'));
  };

  GetUserInformation();

  return (
    <Provider store={store}>
      <AppNavigation user={user} />
    </Provider>
  );
}
