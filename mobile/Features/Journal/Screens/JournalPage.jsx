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
import { useSelector } from 'react-redux';

const recoletaFont = '../../../assets/fonts/Recoleta/Recoleta-Regular';
const cabinetGrotesk = '../../../assets/fonts/CabinetGrotesk/CabinetGrotesk-Regular';

export function JournalPage({
  navigation, freeWrite,
}) {
  const [selectedImage, setSelectedImage] = useState('');
  const [uploadImageURL, setUploadImageURL] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [randomTitle, setRandomTitle] = useState();
  const [freeWriteTitle, setFreeWriteTitle] = useState('');

  const newEmail = useSelector((state) => state.auth.email);

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

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formattedDate = formatDate(currDate);
  const newWordCount = wordsLen(text);
  const newTime = currDate.getTime();

  const addNewJournal = async (newPrompt, newText, newUploadImage) => {
    try {
      handlePopUp();
      // const pstDate = currentdate.toLocaleString('en-US', {
      //   timeZone: 'America/Los_Angeles',
      // });

      try {
        await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/offJournal/createJournal`, {
          email: newEmail,
          prompt: newPrompt,
          text: newText,
          wordCount: newWordCount,
          creationTime: newTime,
          modifiedTime: newTime,
          guided: !(freeWrite),
          image: selectedImage,
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
    setText('');
    removeImage();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#E5F8F3' }}>
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
              <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: cabinetGrotesk }}>{`${formattedDate}`}</Text>
            </View>
          </View>
          {freeWrite ? (
            <TextInput
              style={{
                backgroundColor: '#F6FCFC',
                color: 'black',
                fontSize: 13,
                paddingTop: 15,
                padding: 17,
                borderRadius: 8,
                marginTop: 5,
                width: '85%',
                height: 50,
                flex: 1,
                fontFamily: cabinetGrotesk,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,

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
                <Text style={{
                  color: 'rgba(0, 0, 0, 1)', fontSize: 30, marginLeft: 15, fontFamily: recoletaFont,
                }}
                >
                  {randomTitle}
                </Text>
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
            style={{ flex: 1 }}
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
                fontFamily: cabinetGrotesk,
                flex: 1,
                padding: 20,
                paddingTop: 20,
                fontSize: 13,
                backgroundColor: '#F6FCFC',
                marginBottom: 3,
                marginTop: 10,
                minWidth: '85%',
                minHeight: 350,
                alignItems: 'center',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1, // Adjust the opacity to change the intensity of the shadow
                shadowRadius: 4,
              }}
            />
          </TouchableOpacity>
          <View style={{
            marginBottom: 10, width: '88%', flexDirection: 'row', alignItems: 'flex-start',
          }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{
                marginLeft: 8, fontSize: 12, textAlign: 'left', fontFamily: cabinetGrotesk,
              }}
              >
                word count:
                {' '}
                {wordsLen(text)}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: 15,
              padding: 20,
              width: '85%',
              minHeight: 80,
              borderRadius: 8,
              backgroundColor: '#F6FCFC',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1, // Adjust the opacity to change the intensity of the shadow
              shadowRadius: 4,
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
                    <Text style={{
                      fontFamily: cabinetGrotesk, textAlign: 'center', fontSize: 10, color: 'rgba(0, 0, 0, 1)',
                    }}
                    >
                      Add Attachment
                    </Text>
                    <Text style={{ fontFamily: cabinetGrotesk, fontSize: 10, color: 'rgba(103, 108, 108, 1)' }}>(photo/video supported)</Text>
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
                        <Text style={{ fontFamily: cabinetGrotesk, fontSize: 13, marginBottom: 18 }}>Attachments</Text>
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
              <Text style={{ fontFamily: cabinetGrotesk, fontSize: 14, color: '#E0F1F3' }}> Submit Journal</Text>
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
              alignItems: 'center', paddingVertical: 26, paddingHorizontal: 31, borderRadius: 16, backgroundColor: '#DFE5E5', width: '85%', minHeight: '34%',
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
                  marginTop: 3, textAlign: 'center', maxWidth: '70%', fontSize: 12, color: '#929999', flex: 1,
                }}
                >
                  You can always go back to edit past entries later
                </Text>

              </View>

              {freeWrite ? (
                <Pressable
                  style={{
                    margin: 10, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: '#374342', minWidth: '95%',
                  }}
                  onPress={() => addNewJournal(freeWriteTitle, text, uploadImageURL)}
                >
                  <Text style={{
                    fontWeight: 'bold', color: '#F6FCFC', fontSize: 14, fontFamily: cabinetGrotesk,
                  }}
                  >
                    Submit Now
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    margin: 10, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: '#374342', width: '94%',
                  }}
                  onPress={() => addNewJournal(randomTitle, text, uploadImageURL)}
                >
                  <Text style={{
                    fontSize: 14, fontWeight: 500, color: '#F6FCFC', fontFamily: cabinetGrotesk,
                  }}
                  >
                    Submit Now
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={{
                  margin: 5, borderRadius: 99, alignItems: 'center', justifyContent: 'center', height: 40, borderWidth: 2, borderColor: '#546967', width: '94%',
                }}
                onPress={handlePopUp}
              >
                <Text style={{ fontSize: 14, fontWeight: 500, fontFamily: cabinetGrotesk }}>Cancel</Text>
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
            <Text style={{
              color: isFocused ? '#000000' : '#E5F8F3', fontSize: 14, fontFamily: cabinetGrotesk, fontWeight: 500,
            }}
            >
              {label}
            </Text>
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

CustomTabBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  state: PropTypes.string.isRequired,
  descriptors: PropTypes.string.isRequired,
};
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
