import {
  ScrollView, Text, View, TextInput,
  Modal, TouchableOpacity, Pressable, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LinearGradient } from 'expo-linear-gradient';

export function JournalPage({
  navigation, freeWrite,
}) {
  const [selectedImage, setSelectedImage] = useState('');
  // const [viewImage, setViewImage] = useState(false);
  const [uploadImageURL, setUploadImageURL] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [randomTitle, setRandomTitle] = useState();
  const [freeWriteTitle, setFreeWriteTitle] = useState('');
  // console.log('randomTitle:', randomTitle);

  const [text, setText] = useState(''); // state for the text the user types in
  const [confirmPopUp, setConfirmPopUp] = useState(false); /* state that tells if
  the confirm popup is showing or not */
  const [pointerEvents, setPointerEvents] = useState('none');
  const textInputRef = useRef(null);

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

  const handleBlur = () => {
    setPointerEvents('none');
  };

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

  const removeImage = () => {
    setSelectedImage('');
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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#E5F8F3' }}>
      <LinearGradient
        colors={['#E0F1F3', '#E5F8F3']}
        style={{ flex: 1}}
      >
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 15}}>
          <View style={{
            flex: 1, width: '88%', flexDirection: 'row', alignItems: 'flex-start',
          }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14 }}>{`${formattedDate}, ${militaryToStandard(timeHours)}:${formatMinutes(timeMinutes)}`}</Text>
            </View>
          </View>
          {freeWrite ? (
            <TextInput
              style={{
                backgroundColor: '#C6CECE',
                color: 'black',
                fontSize: 13,
                paddingTop: 15,
                padding: 17,
                borderRadius: 8,
                marginTop: 5,
                width: '85%',
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
              <View style={{ width: '85%' }}>
                <Text style={{ color: 'rgba(0, 0, 0, 1)', fontSize: 30, marginLeft: 15 }}>{randomTitle}</Text>
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
          <TouchableOpacity
          style={{flex: 1}}
            activeOpacity={1}
            onPress={() => navigation.navigate('PostDetails', {
              randomTitle, text, setText, generateRandomPrompt, freeWriteTitle, freeWrite,
            })}
          >
            <TextInput
              multiline
              placeholder="Type here..."
              placeholderTextColor="#676C6C"
              ref={textInputRef}
              onChangeText={(inputText) => setText(inputText)}
              pointerEvents={pointerEvents}
              onBlur={handleBlur}
              value={text}
              style={{
                flex: 1, padding: 20, paddingTop: 20, fontSize: 13, backgroundColor: '#C6CECE', margin: 15, minWidth: '85%', minHeight: 350, alignItems: 'center', borderRadius: 8,
              }}
            />
          </TouchableOpacity>
          <View style={{
            marginBottom: 15, width: '88%', flexDirection: 'row', alignItems: 'flex-start',
          }}
          >
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
              marginBottom: 15, padding: 20, width: '88%', minHeight: 80, borderRadius: 8, backgroundColor: '#C6CECE', alignItems: 'center', justifyContent: 'center', marginTop: 10,
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
                    <Text style={{ textAlign: 'center', fontSize: 10, color: 'rgba(0, 0, 0, 1)' }}>Add Attachment</Text>
                    <Text style={{ fontSize: 10, color: 'rgba(103, 108, 108, 1)' }}>(photo/video supported)</Text>
                  </View>
                </View>
              )
                : (
                  <View style={{
                    flex: 1, position: 'relative', alignItems: 'center', paddingBottom: 10,
                  }}
                  >
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 13, marginBottom: 18 }}>Attachments</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }}>
                      <Image
                        style={{ width: 28, height: 28, marginRight: 7 }}
                        source={require('../../../assets/attachImageBig.png')}
                      />
                    </TouchableOpacity>
                    <View style={{ position: 'relative' }}>
                      <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 200, height: 200, borderRadius: 8 }}
                      />
                      <TouchableOpacity onPress={removeImage} style={{ position: 'absolute', top: -8, right: -20 }}>
                        <Image
                          style={{ width: 20, height: 20, marginRight: 10 }}
                          source={require('../../../assets/deleteImage.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) }
            </View>
          </View>
          <View style={{
            alignItems: 'center', flex: 1, marginTop: 10, marginBottom: 30, width: '60%',
          }}
          >
            <TouchableOpacity
              onPress={handlePopUp}
              style={{
                width: '100%', height: 50, backgroundColor: '#546967', alignItems: 'center', justifyContent: 'center', borderRadius: 99,
              }}
            >
              <Text style={{ fontSize: 14, color: '#E0F1F3' }}> Submit Journal</Text>
            </TouchableOpacity>

          </View>

        </View>
        <Modal visible={confirmPopUp} transparent animation="fade">
          <TouchableOpacity
            onPressOut={handlePopUp}
            style={{
              justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View style={{
              alignItems: 'center',paddingVertical: 26, paddingHorizontal: 31, borderRadius: 16, backgroundColor: '#DFE5E5', width: '85%', minHeight: '34%'
            }}
            >
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{
                  fontSize: 14, fontWeight: 'bold', color: '#343A3A',
                }}
                >
                  Submit Journal Entry?
                </Text>
               
                <Text style={{
                 marginTop: 3, textAlign: 'center', maxWidth: '70%', fontSize: 12, color: '#929999',flex:1,
                }}
                >
                  You can always go back to edit past entries later
                </Text>
     
              </View>
            
              {freeWrite ? (
                <Pressable
                  style={{
                    margin: 10, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 50, backgroundColor: '#546967',
                  }}
                  onPress={() => addNewJournal(username, freeWriteTitle, text, uploadImageURL)}
                >
                  <Text style={{ fontWeight: 'bold', color: '#F6FCFC', fontSize: 18 }}>Submit Now</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    margin: 10, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: '#374342', width:'94%'
                  }}
                  onPress={() => addNewJournal(username, randomTitle, text, uploadImageURL)}
                >
                  <Text style={{ fontSize: 14, fontWeight: 500, color: '#F6FCFC'}}>Submit Now</Text>
                </Pressable>
              )}
        
              <Pressable
                style={{
                  margin: 5, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 40, borderWidth: 2, borderColor: '#546967', width:'94%'
                }}
                onPress={handlePopUp}
              >
                <Text style={{ fontSize: 14, fontWeight: 500 }}>Cancel</Text>
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
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        // Define styles for the tab
        const tabStyles = {
          flex: 1,
          height: 40, // Adjust height as needed
          backgroundColor: isFocused ? '#E0F1F3' : '#546967',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          paddingBottom: 5,

        };

        return (

          <View
            key={index}
            onPress={onPress}
            style={tabStyles}
          >
            <Text style={{ color: isFocused ? '#000000' : '#E5F8F3', fontSize: 14 }}>{label}</Text>
          </View>

        );
      })}
    </View>
  );
}

export default function JournalTabs({ navigation }) {
  const navigateToCalendar = () => {
    navigation.navigate('Calendar');
  };

  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{ flex: 1, backgroundColor: '#E5F8F3' }}>
      <LinearGradient
        colors={['#374342', '#546967']}
        style={{ flex: 0.15 }}
      >
        <View style={{
          flexDirection: 'row', alignSelf: 'flex-end', marginTop: 30, marginRight: 25,
        }}
        >
          <TouchableOpacity
            style={{
              alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: 38, height: 38, margin: 10, backgroundColor: '#B6B6B6CC',
            }}
            onPress={navigateToCalendar}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/calendar.png')}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={{ flex: 0.9, backgroundColor: '#E5F8F3' }}>
        <Tab.Navigator tabBar={CustomTabBar}>
          <Tab.Screen
            name="Guided Prompt"
            component={GuidedPrompt}
            options={{ tabBarIndicatorStyle: { width: 50 } }}

          />
          <Tab.Screen
            name="Free Write"
            component={FreeWrite}
          />
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
