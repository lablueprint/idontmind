import React from 'react';
import styles from '../Components/JournalStyle';
import {
    ScrollView, Text, View, Button, TextInput, Keyboard,
    TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable, Image,
  } from 'react-native';

export default function PostDetails({ navigation, route}) {
//   const route = useRoute();
//   const prompt = route.params?.question;
//   const text = route.params?.body;
//   const date = route.params?.day;
const {randomTitle, inputText} = route.params||{};
// console.log(prompt);
// console.log(body);


  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  }; // navigate to Journal History page

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <View style={styles.container}>
        <View style={styles.textBox}>
          <ScrollView automaticallyAdjustKeyboardInsets> */}
            <Text style={{fontSize: 20}}>{randomTitle}</Text>
            <Text>{inputText}</Text>
          {/* </ScrollView>
        </View>
      </View> */}
      <Button
        title="Go back"
        onPress={navigation.goBack}
      />

      <Button
        title="To Past Journal Entries"
        onPress={navigateToJournalHistory}
      />
    </ScrollView>

  );
}
