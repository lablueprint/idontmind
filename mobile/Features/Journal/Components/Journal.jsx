import {
  ScrollView, Text, View, Button, TextInput, Keyboard,
  TouchableWithoutFeedback, Modal, TouchableOpacity,
} from 'react-native';

import React, { useState } from 'react';
import axios from 'axios';
import styles from './JournalStyle';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export default function Journal() {
  const [text, setText] = useState('');
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const handlePopUp = () => {
    setConfirmPopUp(!confirmPopUp);
  };

  const prompt = 'Create a journal post!';
  const username = 'Nicole';

  const addNewJournal = async (newUsername, newPrompt, newText) => {
    const currentdate = new Date();
    const pstDate = currentdate.toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const timestamp = pstDate;
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, {
      username: newUsername, prompt: newPrompt, text: newText, timestamp,
    });
    handlePopUp();
    console.log(res);
  };

  const openImagePicker = () => {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    }).catch((error) => {
      console.log('Error selecting image: ', error);
    });
  };

  handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // Process the captured image
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    }).catch((error) => {
      console.log('Error launching camera: ', error);
    });
  }

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
          <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
              <Button title="Choose from Device" onPress={openImagePicker} />
            </View>
            <View style={{ marginTop: 20,marginBottom: 50 }}>
              <Button title="Open Camera" onPress={handleCameraLaunch} />
            </View> 
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