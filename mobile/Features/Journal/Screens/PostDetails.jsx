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

            {freeWrite ? (<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{freeWriteTitle}</Text>) : (<Text style={{ fontSize: 40, marginBottom: 20 }}>{randomTitle}</Text>)}
          </View>
          <View style={{
            width: '80%', height: '70%',
          }}
          >
            <TextInput
              ref={textInputRef}
              multiline
              placeholder="Continue typing..."
              onChangeText={handleTextChange}
              value={newText}
              style={{ flex: 1, fontSize: 16, backgroundColor: '#C6CECE', borderRadius: 8, padding: 30, paddingTop: 30}}
            />

          </View>
          <Button
            title="Go back"
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
