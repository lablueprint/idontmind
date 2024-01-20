import {
  ScrollView, Text, View, Button, TextInput, Keyboard,
  TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable,
} from 'react-native';

import React, { useState } from 'react';
import axios from 'axios';
import styles from './JournalStyle';

export default function Journal() {
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
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, {
       'username': newUsername, 'prompt': newPrompt, 'text': newText, 'timestamp': timestamp 
    });
    console.log(res);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <Text style={styles.prompt}>{prompt}</Text>
          <View style={styles.textBox}>
            <ScrollView automaticallyAdjustKeyboardInsets>
              <TextInput
                multiline
                placeholder="Type your response"
                onChangeText={setText}
                value={text}
              />
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
          <Button title="Submit" onPress={handlePopUp} />
          <Modal visible={confirmPopUp}>
            <TouchableOpacity onPressOut={handlePopUp} style={styles.modalView}>
              <View>
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
  );
<<<<<<< HEAD:mobile/Features/Feed/Components/Journal.jsx
}
=======
}
>>>>>>> dce96b1edf667825416cdd2451bcadcd384dcd9d:mobile/Features/Journal/Components/Journal.jsx
