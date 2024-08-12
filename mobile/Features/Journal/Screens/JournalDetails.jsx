import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  Pressable, Image, ScrollView, Text, View, Button
  ,
} from 'react-native';
import backArrowJournal from '../../../assets/images/backArrowJournal.png'

export default function JournalDetails({ navigation }) {
  const route = useRoute();
  // const username = route.params?.user;
  const prompt = route.params?.question;
  const text = route.params?.body;
  const date = route.params?.timestamp;
  const guided = route.params?.type;

  return (
    <View style={{width: '100%', height: '100%', paddingTop: '15%', paddingHorizontal: '10%', backgroundColor: '#E4F6F3'}}>
      <View style={{flexDirection: 'row', marginVertical: '3%'}}>
    <Pressable onPress={navigation.goBack}>
    <Image style={{width: 11.7, height: 19.8}}source={backArrowJournal}></Image>
  </Pressable>
  {guided ? <Text style={{marginLeft: '30%', fontSize: 40, fontFamily: 'recoleta-medium'}}>Guided Journal </Text>: <Text style={{marginLeft: '30%', fontSize: 40, fontFamily: 'recoleta-medium'}}> Free Write </Text>}
  </View>
    <ScrollView contentContainerStyle={{ flex: 1 }}>
          <ScrollView automaticallyAdjustKeyboardInsets>
            <Text style={{fontSize: 16, fontFamily: 'cabinet-grotesk-regular'}}>{date}</Text>
            <Text style={{ marginVertical: '5%', fontSize: 32, fontFamily: 'recoleta-medium' }}>{prompt}</Text>
            <Text style={{fontSize: 16,fontFamily: 'cabinet-grotesk-regular'}}>{text}</Text>
          </ScrollView>
    </ScrollView>
    </View>

  );
}
