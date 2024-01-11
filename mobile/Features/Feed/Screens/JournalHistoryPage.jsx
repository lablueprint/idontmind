import JournalHistory from '../Components/JournalHistory';
import {
    Button, View
  } from 'react-native';

export default function JournalPage({ navigation }) {
    const navigateToLanding = () => {
        navigation.navigate('Landing');
    };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <JournalHistory/>
    <Button
        title="To Landing"
        onPress={navigateToLanding}
    />
    </View>
  );
}
