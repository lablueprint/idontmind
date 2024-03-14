import {
    ScrollView, Text, View, Button
  } from 'react-native';

export default function JournalDetails({ navigation }){

    const route = useRoute();
    const body = route.params?.body;
    const isHistory = route.params?.isHistory;/* retrieve the value of isHistory
    from the previous navigation page (JournalHistoryPage) */
    
    return (
        <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.container}>
            {getPrompt(freeWrite)}
            <View style={styles.textBox}>
              <ScrollView automaticallyAdjustKeyboardInsets>
                <Text>Hi</Text>
                <Text>{body}</Text>
              </ScrollView>
            </View>
          </View>
    
          <Button
            title="To Past Journal Entries"
            onPress={navigateToJournalHistory}
          />
        </ScrollView>
    
      );
}