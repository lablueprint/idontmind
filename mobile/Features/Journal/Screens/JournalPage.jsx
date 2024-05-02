import {
  ScrollView, Text, View, Button, TextInput,
  Modal, TouchableOpacity, Pressable, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../Components/JournalStyle';
import { useRoute } from '@react-navigation/native';



export function JournalPage({
  navigation, freeWrite, isHistory,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [randomTitle, setRandomTitle] = useState();
  const [freeWriteTitle, setFreeWriteTitle] = useState('');
  // console.log('randomTitle:', randomTitle);

  const [text, setText] = useState(''); // state for the text the user types in
  const [confirmPopUp, setConfirmPopUp] = useState(false); /* state that tells if
  the confirm popup is showing or not */

  const handlePopUp = () => {
    setConfirmPopUp(!confirmPopUp);
  }; // toggles confirmPopUp

  const generateRandomPrompt = () => {
    if (prompts.length > 0) {
      let randomIndex = Math.floor(Math.random() * prompts.length);
      console.log(randomIndex);
      let randomPrompt = prompts[randomIndex]['Journal Prompts'];
      while (randomPrompt === randomTitle) {
        randomIndex = Math.floor(Math.random() * prompts.length);
        randomPrompt = prompts[randomIndex]['Journal Prompts'];
      }
      setRandomTitle(randomPrompt);
      return randomPrompt;
    }
  };

  useEffect(() => {
    const getPrompts = async () => {
      try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/content/getAllPrompts`);
        console.log(res.data);
        setPrompts(res.data);
        generateRandomPrompt();
      } catch (err) {
        console.err(err);
        return err;
      }
    };
    getPrompts();
  }, []);
  useEffect(() => { generateRandomPrompt(); }, [prompts]);

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

  const getPrompt = (option) => {
    if (!option) {
      return <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{randomTitle}</Text>;
    }
    return (
      <TextInput
        style={{
          backgroundColor: '#C6CECE',
          color: 'black',
          padding: 10,
          borderRadius: 5,
          margin: 20,
        }}
        multiline
        placeholder="Add Title..."
        onChangeText={setFreeWriteTitle}
        value={freeWriteTitle}
      />
    );
  };
  console.log("free write title", freeWriteTitle);

  const currDate = new Date();

  // const prompt = 'Create a journal post!';
  const username = 'Nicole'; // set prompt and username to constants at the moment, but should be able to get that info dynamically

  const addNewJournal = async (newUsername, newPrompt, newText, isFreeWrite) => {
    handlePopUp();
    const currentdate = new Date();
    const pstDate = currentdate.toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    });
    const timestamp = pstDate;
    // const timestamp = currentdate;
    await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, {
      username: newUsername, prompt: newPrompt, text: newText, type: isFreeWrite, timestamp,
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

  const formatMinutes = (minutes) => (minutes < 10 ? '0' : '') + minutes;

  const militaryToStandard = (hours) => {
    if (hours > '12') {
      return (hours - '12');
    }
    return hours;
  };

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formattedDate = formatDate(currDate);

  const handleTextChange = (inputText) => {
    setText(inputText);
    navigation.navigate('PostDetails', {randomTitle, inputText});
  };

  /* render it in two different ways depending on if isHistory(if false, editable text box, if
  true, uneditable text box with previously written text) */
  // console.log("IN JOURNAL");
  // const journalTitle = freeWrite ? title : freeWriteTitle;
  // console.log("journal title: " , journalTitle);
  if (!isHistory) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 15 }}>
          <Text>{`${formattedDate}, ${militaryToStandard(timeHours)}:${formatMinutes(timeMinutes)}`}</Text>
          {freeWrite ? (
            <TextInput
              style={{
                backgroundColor: '#C6CECE',
                color: 'black',
                padding: 10,
                borderRadius: 5,
                marginTop: 5,
              }}
              multiline
              placeholder="Add Title..."
              onChangeText={setFreeWriteTitle}
              value={freeWriteTitle}
            />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15 }}>{randomTitle}</Text>
              </View>
              <Pressable onPress={generateRandomPrompt}>
                <Image
                  style={{
                    height: 20, width: 20, marginRight: 15, marginBottom: 10,
                  }}
                  source={require('../../../assets/iterate.png')}
                />
              </Pressable>
            </View>

          )}
          <TextInput
            multiline
            placeholder="Type your response"
            onFocus={() => navigation.navigate('PostDetails', {
              randomTitle, text, setText, generateRandomPrompt, freeWriteTitle, freeWrite,
            })}
            onChangeText={(inputText) => setText(inputText)}
            value={text}
            style={{
              margin: 15, minWidth: '80%', minHeight: 300, borderWidth: 2, borderColor: 'black', alignItems: 'center',
            }}
          />
          {/* </Pressable> */}
          <Text>
            word count:
            {' '}
            {wordsLen(text)}
          </Text>
          <TouchableOpacity
            style={{
              minWidth: '80%', minHeight: 40, borderRadius: 2, backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', marginTop: 10,
            }}
            onPress={pickImage}
          >
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
          <Button title="Submit" onPress={handlePopUp} />
          <Button
            title="To Past Journal Entries"
            onPress={navigateToJournalHistory}
          />
        </View>
        <Modal visible={confirmPopUp}>
          <TouchableOpacity onPressOut={handlePopUp} style={styles.modalView}>
            <View style={styles.modalBox}>
              <Text style={{ fontSize: 20 }}>confirm journal entry?</Text>
              {freeWrite ? (
                <Pressable
                  style={styles.modalSelections}
                  onPress={() => addNewJournal(username, freeWriteTitle, text)}
                >
                  <Text>yes</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={styles.modalSelections}
                  onPress={() => addNewJournal(username, randomTitle, text)}
                >
                  <Text>yes</Text>
                </Pressable>
              )}
              <Pressable style={styles.modalSelections} onPress={handlePopUp}>
                <Text>no</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.container}>
        {getPrompt(freeWrite)}
        <View style={styles.textBox}>
          <ScrollView automaticallyAdjustKeyboardInsets>
            <Text>Hi</Text>
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
    <JournalPage navigation={navigation} freeWrite={false} />
  );
}
function FreeWrite({ navigation }) {
  return <JournalPage navigation={navigation} freeWrite />;
}

export default function JournalTabs({ navigation }) {
  const route = useRoute();
  const isHistory = route.params?.isHistory;

  console.log("IN THE ACTUAL TAB JOURNAL T")
  console.log("Tab is history", isHistory);
  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  const Tab = createMaterialTopTabNavigator();
  if (!isHistory){ return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 20 }}>
        <TouchableOpacity style={{ margin: 10 }} onPress={navigateToCalendar}>
          <Image
            style={{ width: 30, height: 31 }}
            source={require('../../../assets/calendar.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }}>
          <Image
            style={{ width: 20, height: 31 }}
            source={require('../../../assets/images/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 40, margin: 10 }}>
          <Image
            style={{ width: 20, height: 31 }}
            source={require('../../../assets/images/filter.png')}
          />
        </TouchableOpacity>
      </View>

      <Tab.Navigator>
        <Tab.Screen name="Guided Prompt" component={GuidedPrompt} />
        <Tab.Screen name="Free Write" component={FreeWrite} />
      </Tab.Navigator>
    </View>
  );
  }
  else{
    return (
      <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          {getPrompt(freeWrite)}
          <View style={styles.textBox}>
            <ScrollView automaticallyAdjustKeyboardInsets>
              <Text>Hi</Text>
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
}

JournalPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  freeWrite: PropTypes.bool.isRequired,
  isHistory: PropTypes.bool.isRequired,
};

JournalTabs.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

GuidedPrompt.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

FreeWrite.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
