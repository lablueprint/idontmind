import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppNavigation from './Navigation/AppNavigation';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
