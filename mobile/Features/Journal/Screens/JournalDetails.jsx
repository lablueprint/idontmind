import React from 'react';
import JournalPage from './JournalPage'; // Make sure to provide the correct path
import { useRoute } from '@react-navigation/native';
import styles from '../Components/JournalStyle';
import {
    ScrollView, Text, View, Button, TextInput, Keyboard,
    TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable, Image,
  } from 'react-native';

export default function JournalDetails({ navigation }) {
  const route = useRoute();
  const username = route.params?.user;
  const prompt = route.params?.question;
  const text = route.params?.body;
  const date = route.params?.day;

  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  }; // navigate to Journal History page

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <ScrollView automaticallyAdjustKeyboardInsets>
            <Text>{date}</Text>
            <Text style={{fontSize: 20}}>{prompt}</Text>
            <Text>{text}</Text>
          </ScrollView>
        </View>
      </View>
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