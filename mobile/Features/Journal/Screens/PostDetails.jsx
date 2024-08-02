import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView, Text, View, Button, TextInput, Keyboard
  ,
} from 'react-native';
import PropTypes from 'prop-types';

const recoletaFont = '../../../assets/fonts/Recoleta/Recoleta-Regular';

const cabinetGrotesk = '../../../assets/fonts/CabinetGrotesk/CabinetGrotesk-Regular';

export default function PostDetails({ navigation, route }) {
  const {
    randomTitle, text, setText, freeWriteTitle, freeWrite,
  } = route.params || {};
  const textInputRef = useRef(null);
  const [newText, setNewText] = useState(text);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true); // Flag for initial render
  const handleKeyboardHide = () => {
    setIsTyping(false);
  };

  useEffect(() => {
    textInputRef.current.focus();

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    // Cleanup function to remove event listener
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    // Ignore the first render
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    // Check if typing is false and navigate back
    if (!isTyping) {
      navigation.goBack();
    }
  }, [isTyping]); // Re-run effect when isTyping changes

  const handleTextChange = (inputText) => {
    setNewText(inputText);
    setText(inputText);
  };

  const handleTextInputFocus = () => {
    setIsTyping(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#E0F1F3' }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <View
          style={{
            marginTop: 50,
            alignItems: 'center',
            width: '88%',
            height: '100%',
          }}
        >
          {freeWrite ? (
            <Text style={{ fontSize: 30, fontFamily: recoletaFont, marginBottom: 20 }}>
              {freeWriteTitle}
            </Text>
          ) : (
            <Text style={{ fontFamily: recoletaFont, fontSize: 30, marginBottom: 20 }}>
              {randomTitle}
            </Text>
          )}
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                width: '95%',
                height: '90%',
                alignItems: 'center',
              }}
            >
              <TextInput
                ref={textInputRef}
                multiline
                placeholder="Continue typing..."
                placeholderTextColor="#343A3A"
                onChangeText={handleTextChange}
                value={newText}
                onFocus={handleTextInputFocus}
                onBlur={handleKeyboardHide} // This is where we handle keyboard hide
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontFamily: cabinetGrotesk,
                  fontWeight: 500,
                  backgroundColor: '#F6FCFC',
                  borderRadius: 8,
                  padding: 25,
                  paddingTop: 25,
                  height: '80%',
                  minWidth: '100%',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1, // Adjust the opacity to change the intensity of the shadow
                  shadowRadius: 4,
                }}
              />
            </View>
            <Button title="Go back" onPress={navigation.goBack} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

PostDetails.propTypes = {
  navigation: PropTypes.shape.isRequired,
  route: PropTypes.func.isRequired,
};
