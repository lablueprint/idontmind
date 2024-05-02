import {
  ScrollView, Text, View, Button, TextInput,
  Modal, TouchableOpacity, Pressable, Image, Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../Components/JournalStyle';

export function JournalPage({
  navigation, freeWrite,
}) {
  const windowHeight = Dimensions.get('window').height;

  const [selectedImage, setSelectedImage] = useState(null);
  // const [viewImage, setViewImage] = useState(false);
  const [uploadImageURL, setUploadImageURL] = useState(null);
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
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setUploadImageURL(result.assets[0]);
    }
  };

  const currDate = new Date();

  // const prompt = 'Create a journal post!';
  const username = 'Nicole'; // set prompt and username to constants at the moment, but should be able to get that info dynamically

  const addNewJournal = async (newUsername, newPrompt, newText, newUploadImage) => {
    try {
      handlePopUp();
      const currentdate = new Date();
      const pstDate = currentdate.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
      });
      const timestamp = pstDate;
      // Add try-catch block to handle potential errors in axios requests
      try {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/createJournal`, {
          username: newUsername, prompt: newPrompt, text: newText, timestamp, image: selectedImage,
        });
      } catch (error) {
        console.error(error);
        // Handle error
      }
      try {
        axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/uploadImage`, {
          imageObject: newUploadImage,
        });
        console.log('uploadeded image', newUploadImage);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  /*   function that creates a new journal entry with username, prompt, text, and timestamp and
  sends it to the MongoDB */

  const navigateToJournalHistory = () => {
    navigation.navigate('Journal History');
  }; // navigate to Journal History page

  // const getFilenameFromUri = (uri) => {
  //   if (uri) {
  //     const uriParts = uri.split('/');
  //     return uriParts[uriParts.length - 1];
  //   }
  //   return '';
  // };

  const removeImage = () => {
    setSelectedImage('');
    // setViewImage(false);
  };

  // const handleFilenamePress = () => {
  //   setViewImage(!viewImage);
  // };

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

  /* render it in two different ways depending on if isHistory(if false, editable text box, if
  true, uneditable text box with previously written text) */
  // if (!isHistory) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        colors={['#E0F1F3', '#E5F8F3']}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 15 }}>
          <View style={{
            flex: 1, width: '88%', flexDirection: 'row', alignItems: 'flex-start',
          }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18 }}>{`${formattedDate}, ${militaryToStandard(timeHours)}:${formatMinutes(timeMinutes)}`}</Text>
            </View>
          </View>
          {freeWrite ? (
            <TextInput
              style={{
                backgroundColor: '#C6CECE',
                color: 'black',
                fontSize: 16,
                paddingTop: 15,
                padding: 10,
                borderRadius: 8,
                marginTop: 5,
                width: '88%',
                height: 50,
                flex: 1,
              }}
              multiline
              placeholder="Optional: Add Title..."
              placeholderTextColor="rgba(103, 108, 108, 1)"
              onChangeText={setFreeWriteTitle}
              value={freeWriteTitle}
            />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: '88%' }}>
                <Text style={{ color: 'rgba(0, 0, 0, 1)', fontSize: 40, marginLeft: 15 }}>{randomTitle}</Text>
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
            placeholder="Type here..."
            placeholderTextColor="#676C6C"
            onFocus={() => navigation.navigate('PostDetails', {
              randomTitle, text, setText, generateRandomPrompt, freeWriteTitle, freeWrite,
            })}
            onChangeText={(inputText) => setText(inputText)}
            value={text}
            style={{
              flex: 1, padding: 20, paddingTop: 20, fontSize: 16, backgroundColor: '#C6CECE', margin: 15, minWidth: '88%', minHeight: windowHeight * 0.5, alignItems: 'center', borderRadius: 8,
            }}
          />
          <View style={{ width: '88%', flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, textAlign: 'left' }}>
                word count:
                {' '}
                {wordsLen(text)}
              </Text>
            </View>
          </View>

          <View
            style={{
              padding: 20, width: '88%', minHeight: 80, borderRadius: 8, backgroundColor: '#C6CECE', alignItems: 'center', justifyContent: 'center', marginTop: 10,
            }}
          >

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {selectedImage === '' ? (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={pickImage}>
                    <Image
                      style={{ width: 20, height: 20, marginRight: 10 }}
                      source={require('../../../assets/attachImage.png')}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={{ fontSize: 12, color: 'rgba(0, 0, 0, 1)' }}>Add Attachment</Text>
                    <Text style={{ fontSize: 12, color: 'rgba(103, 108, 108, 1)' }}>(photo/video supported)</Text>
                  </View>
                </View>
              )
                : (
                  <View style={{ position: 'relative' }}>
                    <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, borderRadius: 8 }} />
                    <TouchableOpacity onPress={removeImage} style={{ position: 'absolute', top: -8, right: -20 }}>
                      <Image
                        style={{ width: 20, height: 20, marginRight: 10 }}
                        source={require('../../../assets/deleteImage.png')}
                      />
                    </TouchableOpacity>
                  </View>
                ) }
            </View>
          </View>
          <TouchableOpacity
            onPress={handlePopUp}
            style={{
              margin: 15, width: '60%', height: 50, backgroundColor: '#546967', alignItems: 'center', justifyContent: 'center', borderRadius: 99,
            }}
          >
            <Text style={{ fontSize: 20, color: '#E0F1F3' }}> Submit Journal</Text>

          </TouchableOpacity>

        </View>
        <Modal visible={confirmPopUp}>
          <TouchableOpacity onPressOut={handlePopUp} style={styles.modalView}>
            <View style={{
              paddingVertical: 26, paddingHorizontal: 31, borderRadius: 8, backgroundColor: '#DFE5E5',
            }}
            >
              <Text style={{ fontSize: 18, color: '#343A3A' }}>Submit Journal Entry?</Text>
              <Text style={{ fontSize: 16, color: '#929999' }}>You can always go back to edit past entries later</Text>
              {freeWrite ? (
                <Pressable
                  style={styles.modalSelections}
                  onPress={() => addNewJournal(username, freeWriteTitle, text, uploadImageURL)}
                >
                  <Text>yes</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    margin: 10, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: '#546967',
                  }}
                  onPress={() => addNewJournal(username, randomTitle, text, uploadImageURL)}
                >
                  <Text style={{ fontSize: 18, fontWeight: 700, color: '#F6FCFC' }}>Submit Now</Text>
                </Pressable>
              )}
              <Pressable
                style={{
                  margin: 10, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: '#C6CECE',
                }}
                onPress={handlePopUp}
              >
                <Text style={{ fontSize: 18, fontWeight: 700, color: '#767C7C' }}>No</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
        </Modal>
      </LinearGradient>
    </ScrollView>
  );
}
// }

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
  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#374342', '#546967']}
        style={{ flex: 0.1 }}
      >
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
      </LinearGradient>

      <View style={{ flex: 0.9 }}>
        <Tab.Navigator>
          <Tab.Screen name="Guided Prompt" component={GuidedPrompt} />
          <Tab.Screen name="Free Write" component={FreeWrite} />
        </Tab.Navigator>
      </View>
    </View>
  );
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
