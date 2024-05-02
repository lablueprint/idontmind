import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  ScrollView, Text, View, Button, Image
  ,
} from 'react-native';
import axios from 'axios';
import styles from '../Components/JournalStyle';

export default function JournalDetails({ navigation }) {
  const route = useRoute();
  // const username = route.params?.user;
  const prompt = route.params?.promptParam;
  const text = route.params?.textParam;
  const date = route.params?.dateParam;
  const image = route.params?.imageParam;

  const [awsImage, setAWSImage] = useState('');

  // Set image key to the post's image field if it exists, otherwise set it to an empty string
  const getLastSegment = (url) => {
    // Split the string by '/' characters and get the last element of the resulting array
    const segments = url.split('/');
    return segments[segments.length - 1];
  };

  const imageKey = image ? getLastSegment(image) : '';

  const getImage = async (key) => {
    try {
      console.log('image key in getImage:', key);
      const result = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/getImage`, {
        params: { imageKey: key },
      });
      setAWSImage(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 1) post
  // 2) req.params - embed string, query directly into URL

  useEffect(() => {
    // Call getImage function only if imageKey is not empty
    console.log('IMAGE KEY:', imageKey);
    if (imageKey) {
      getImage(imageKey);
      console.log('aws Image:', awsImage);
    }
  }, []);

  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  }; // navigate to Journal History page

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <ScrollView automaticallyAdjustKeyboardInsets>
            <Text>{date}</Text>
            <Text style={{ fontSize: 20 }}>{prompt}</Text>
            <Text>{text}</Text>
            <Image source={{ uri: awsImage }} style={{ width: 200, height: 200 }} />
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
