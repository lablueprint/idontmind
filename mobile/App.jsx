import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigation from './Navigation/AppNavigation';
import { store, persistor } from './redux/store';
import Loading from './Features/Register/Loading';

// npx expo run:ios

export default function App() {
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
      });
    }

    loadFont();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
}
