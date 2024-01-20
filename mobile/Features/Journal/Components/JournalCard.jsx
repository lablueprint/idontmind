import {
    ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable,
  } from 'react-native';
  import PropTypes from 'prop-types';
  import React, { useState } from 'react';
  import axios from 'axios';
  import styles from './JournalHistoryStyle';
  
  //props: username, prompt, text, timestamp
  export default function JournalCard(props) {

    const handlePress = (text) => {
        props.onPress(text);
    }
    return (
      <Pressable style={styles.journalCard} onPress={()=>handlePress(props.text)}>
        <Text>username: {props.username}</Text>
        <Text>date: {props.date}</Text>
        <Text>prompt: {props.prompt}</Text>
      </Pressable>
    );
  }
  
JournalCard.propTypes = {
    username: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
  