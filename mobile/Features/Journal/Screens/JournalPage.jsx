import {
  ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable,
} from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Components/JournalStyle';

export default function JournalPage({navigation}) {
  
  const route = useRoute()
  const body = route.params?.body
  let isHistory = route.params?.isHistory
  // useFocusEffect(
  //   React.useCallback(() => {
  //     return() => {
  //       isHistory = false
  //       console.log("focus")
  //       console.log(isHistory)
  //     };
  //   }, [])
  // );

  let text_box;
  if (isHistory){
    text_box = <Text>{body}</Text>
  }
  else{
    console.log(body)
    text_box = <TextInput multiline placeholder="Type your response" onChangeText={setText} value={text}/>
  }

  const [text, setText] = useState('');
  const [confirmPopUp, setConfirmPopUp] = useState(false);

  const handlePopUp = () => {
    setConfirmPopUp(!confirmPopUp);
  };

  const prompt = 'Create a journal post!';
  const username = 'Nicole';

  const addNewJournal = async (newUsername, newPrompt, newText) => {
    handlePopUp();
    const currentdate = new Date();
    const timestamp = currentdate;
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, { 'username': newUsername, 'prompt': newPrompt, 'text': newText, 'timestamp': timestamp });
    console.log(res);
  };

  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  };

  if(!isHistory){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
              <Text style={styles.prompt}>{prompt}</Text>
              <View style={styles.textBox}>
                <ScrollView automaticallyAdjustKeyboardInsets>
                <TextInput multiline placeholder="Type your response" onChangeText={setText} value={text}/>
                <View style={{ height: 40 }} />
                </ScrollView>
              </View>
              <Button title="Submit" onPress={handlePopUp} />
              <Modal visible={confirmPopUp}>
                <TouchableOpacity onPressOut={handlePopUp} style={styles.modalView}>
                  <View style={styles.modalBox}>
                    <Text style={{fontSize: 20}}>confirm journal entry?</Text>
                    <Pressable style={styles.modalSelections} onPress={() => addNewJournal(username, prompt, text)}>
                        <Text>
                            yes
                        </Text>
                    </Pressable>
                    <Pressable style={styles.modalSelections} onPress={handlePopUp}>
                        <Text>
                            no
                        </Text>
                    </Pressable>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>
        </TouchableWithoutFeedback>
  
        <Button
          title="To Past Journal Entries"
          onPress={navigateToJournalHistory}
        />
      </View>
      
    );

  }
  else{
    return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
              <Text style={styles.prompt}>{prompt}</Text>
              <View style={styles.textBox}>
                <ScrollView automaticallyAdjustKeyboardInsets>
                <Text>{body}</Text>
                <View style={{ height: 40 }} />
                </ScrollView>
              </View>
            </View>
  
        <Button
          title="To Past Journal Entries"
          onPress={navigateToJournalHistory}
        />
      </View>
      
    );
  }

  
}
