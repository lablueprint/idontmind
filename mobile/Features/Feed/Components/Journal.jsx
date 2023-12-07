import {
  ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, Modal, TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
// import PropTypes from 'prop-types';
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
    const currentdate = new Date();
    const timestamp = currentdate;
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, { 'username': newUsername, 'prompt': newPrompt, 'text': newText, 'timestamp': timestamp });
    handlePopUp();
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
          <Modal visible={confirmPopUp} transparent>
            <TouchableOpacity onPressOut={handlePopUp} style={styles.modalView}>
              <View style={styles.modal}>
                <Text>Confirm Submission?</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Button title="Yes" onPress={() => addNewJournal(username, prompt, text)} />
                  <Button title="No" onPress={handlePopUp} />
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}

//   Post.propTypes = {
//     username: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//     timestamp: PropTypes.string.isRequired,
//     navigation: PropTypes.shape({
//       navigate: PropTypes.func,
//     }).isRequired,
//   };
