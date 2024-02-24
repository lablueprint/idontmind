import {
  ScrollView, Text, View, Button, TextInput, Keyboard,
  TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../Components/JournalStyle';

export default function JournalPage({ navigation }) {
  const route = useRoute();
  const body = route.params?.body;
  const isHistory = route.params?.isHistory;/* retrieve the value of isHistory
  from the previous navigation page (JournalHistoryPage) */

  const [text, setText] = useState(''); // state for the text the user types in
  const [confirmPopUp, setConfirmPopUp] = useState(false); /* state that tells if
  the confirm popup is showing or not */

  const handlePopUp = () => {
    setConfirmPopUp(!confirmPopUp);
  }; // toggles confirmPopUp

  const prompt = 'Create a journal post!';
  const username = 'Nicole'; // set prompt and username to constants at the moment, but should be able to get that info dynamically

  const addNewJournal = async (newUsername, newPrompt, newText) => {
    handlePopUp();
    const currentdate = new Date();
    const timestamp = currentdate;
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, {
      username: newUsername, prompt: newPrompt, text: newText, timestamp,
    });
  }; /* function that creates a new journal entry with username, prompt, text, and timestamp and
  sends it to the MongoDB */

  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  }; // navigate to Journal History page

  /* render it in two different ways depending on if isHistory(if false, editable text box, if
  true, uneditable text box with previously written text) */
  if (!isHistory) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
              <Text style={styles.prompt}>{prompt}</Text>
              <View style={styles.textBox}>
                <ScrollView automaticallyAdjustKeyboardInsets>
                  <TextInput multiline placeholder="Type your response" onChangeText={setText} value={text} />
                  <View style={{ height: 40 }} />
                </ScrollView>
              </View>

              {/* <Text>{img}</Text> */}
              <Button title="Submit" onPress={handlePopUp} />
              <Modal visible={confirmPopUp}>
                <TouchableOpacity onPressOut={handlePopUp} style={styles.modalView}>
                  <View style={styles.modalBox}>
                    <Text style={{ fontSize: 20 }}>confirm journal entry?</Text>
                    <Pressable
                      style={styles.modalSelections}
                      onPress={() => addNewJournal(username, prompt, text)}
                    >
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

JournalPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
