import {
  ScrollView, Text, View, Button, TextInput, Keyboard,
  TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import PropTypes, { checkPropTypes } from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SafeAreaView from 'react-native-safe-area-view';
import styles from '../Components/JournalStyle';

export function JournalPage({ navigation, tab }) {
  const route = useRoute();
  const body = route.params?.body;
  const isHistory = route.params?.isHistory;/* retrieve the value of isHistory
  from the previous navigation page (JournalHistoryPage) */
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [title, setTitle] = useState();
  const [prompts, setPrompts] = useState([]);

  const [text, setText] = useState(''); // state for the text the user types in
  const [confirmPopUp, setConfirmPopUp] = useState(false); /* state that tells if
  the confirm popup is showing or not */

  const handlePopUp = () => {
    setConfirmPopUp(!confirmPopUp);
  }; // toggles confirmPopUp

  useEffect(() => {
    const getPrompts = async () => {
      try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/content/getAllPrompts`);
        console.log(res.data);
        setPrompts(res.data);
        // console.log("prompts: ", prompts);
      } catch (err) {
        console.err(err);
        return err;
      }
    };
    getPrompts();
    console.log('PROMPTS IN USE EFFECT: ', prompts);
  }, []);

  const generateRandomPrompt = () => {
    if (prompts.length > 0) {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      console.log(randomIndex);
      const randomPrompt = prompts[randomIndex].question;
      setTitle(randomPrompt);
    }
  };
  useEffect(() => { generateRandomPrompt(); }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const getPrompt = (tag) => {
    if (tag === 1) {
      return <Text style={styles.prompt}>{title}</Text>;
    }
    return <TextInput multiline placeholder="Add Title..." onChangeText={setTitle} value={title} />;
  };

  const currDate = new Date();

  // const prompt = 'Create a journal post!';
  const username = 'Nicole'; // set prompt and username to constants at the moment, but should be able to get that info dynamically

  const addNewJournal = async (newUsername, newPrompt, newText) => {
    handlePopUp();
    const currentdate = new Date();
    const pstDate = currentdate.toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const timestamp = pstDate;
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, {
      username: newUsername, prompt: newPrompt, text: newText, timestamp,
    });
  }; /* function that creates a new journal entry with username, prompt, text, and timestamp and
  sends it to the MongoDB */

  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  }; // navigate to Journal History page

  const getFilenameFromUri = (uri) => {
    if (uri) {
      const uriParts = uri.split('/');
      return uriParts[uriParts.length - 1];
    }
    return '';
  };

  const handleFilenamePress = () => {
    setViewImage(!viewImage);
  };

  const wordsLen = (str) => {
    const array = str.match(/\S+/g);
    if (array == null) {
      return 0;
    }
    return array.length;
  };

  const timeHours = currDate.getHours();
  const timeMinutes = currDate.getMinutes();

  const militaryToStandard = (hours) => {
    if (hours > '12') {
      return (hours - '12');
    }
    return hours;
  };

  /* render it in two different ways depending on if isHistory(if false, editable text box, if
  true, uneditable text box with previously written text) */
  if (!isHistory) {
    return (
      <ScrollView>

        {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
          <SafeAreaView>
            <SafeAreaView style={styles.container}>
              <Text style={{ marginTop: 150 }}>{`${currDate.toDateString()}, ${militaryToStandard(timeHours)}:${timeMinutes}` }</Text>
              <SafeAreaView>
                {getPrompt(tab)}
              </SafeAreaView>
              {tab === 1 && <Button title="Generate Random Prompt" onPress={generateRandomPrompt} />}
              <SafeAreaView style={styles.textBox}>
                <ScrollView automaticallyAdjustKeyboardInsets>
                  <View>
                    <TextInput multiline placeholder="Type your response" onChangeText={setText} value={text} />
                  </View>
                </ScrollView>
              </SafeAreaView>
              <Text>
                word count:
                {' '}
                {wordsLen(text)}
              </Text>
              <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                <Text>+ add attachment</Text>
              </TouchableOpacity>
              {selectedImage !== '' ? (
                <>
                  <TouchableOpacity onPress={handleFilenamePress}>
                    <Text>{getFilenameFromUri(selectedImage)}</Text>
                  </TouchableOpacity>
                  {viewImage && (
                  <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
                  )}
                </>
              ) : null}

              <SafeAreaView>
           

              <Modal visible={confirmPopUp}>
                <TouchableOpacity onPressOut={handlePopUp} style={styles.modalView}>
                  <SafeAreaView style={styles.modalBox}>
                    <Text style={{ fontSize: 20 }}>confirm journal entry?</Text>
                    <Pressable
                      style={styles.modalSelections}
                      onPress={() => addNewJournal(username, title, text)}
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
                  </SafeAreaView>
                </TouchableOpacity>
              </Modal>
              </SafeAreaView>
          

            </SafeAreaView>
          </SafeAreaView>
        {/* </TouchableWithoutFeedback> */}
        
          <Text>hi</Text>
          <Text>hi</Text>     
          <Text>hi</Text>
          <Text>hi</Text>    
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <Text>hi</Text>
          <View>
          <Button title="Submit" onPress={handlePopUp} />
              <Button
                title="To Past Journal Entries"
                onPress={navigateToJournalHistory}
              />
              </View>

      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        {getPrompt(tab)}
        <View style={styles.textBox}>
          <ScrollView automaticallyAdjustKeyboardInsets>
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

JournalPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

function GuidedPrompt({ navigation }) {
  return (
      <JournalPage navigation={navigation} tab={1} />
  );
}
function FreeWrite({ navigation }) {
  return <JournalPage navigation={navigation} tab={2} />;
}

export default function JournalTabs({ navigation }) {
  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{ flex: 1}}>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 40 }}>
        <TouchableOpacity style={{ margin: 10 }} onPress={navigateToCalendar}>
          <Image
            style={{ width: 30, height: 31 }}
            source={require('../../../assets/calendar.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }}>
          <Image
            style={{ width: 20, height: 31 }}
            source={require('../../../assets/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 40, margin: 10 }}>
          <Image
            style={{ width: 20, height: 31 }}
            source={require('../../../assets/filter.png')}
          />
        </TouchableOpacity>
      </View>

      <Tab.Navigator style={{ marginTop: 10 }}>
        <Tab.Screen name="Guided Prompt" component={GuidedPrompt} />
        <Tab.Screen name="Free Write" component={FreeWrite} />
      </Tab.Navigator>
    </View>
  );
}
