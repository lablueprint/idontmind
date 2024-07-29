import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView, Text, View, Button, TextInput
  ,
} from 'react-native';
import PropTypes from 'prop-types';

export default function PostDetails({ navigation, route }) {
  const {
    randomTitle, text, setText, freeWriteTitle, freeWrite,
  } = route.params || {};

  const textInputRef = useRef(null);
  const [newText, setNewText] = useState(text);

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  // Define a function to handle text changefdsafas
  const handleTextChange = (inputText) => {
    setNewText(inputText);
    setText(inputText);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{
          marginTop: 80, alignItems: 'center', width: '100%', height: '100%',
        }}
        >
          <View style={{ alignItems: 'center' }}>

            {freeWrite ? (<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{freeWriteTitle}</Text>) : (<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{randomTitle}</Text>)}
          </View>
          <View style={{
            borderWidth: 2, borderColor: 'black', width: '80%', height: '50%', marginBottom: 0,
          }}
          >
            <TextInput
              ref={textInputRef}
              multiline
              placeholder="Continue typing..."
              onChangeText={handleTextChange}
              value={newText}
              style={{ flex: 1 }}
            />

          </View>
          <Button
            title="Go back now!"
            onPress={navigation.goBack}
          />
        </View>
      </ScrollView>
    </View>
  );
}

PostDetails.propTypes = {
  navigation: PropTypes.shape.isRequired,
  route: PropTypes.shape.isRequired,
};
