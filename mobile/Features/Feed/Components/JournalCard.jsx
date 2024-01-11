import {
    ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable,
  } from 'react-native';
  import PropTypes from 'prop-types';
  import React, { useState } from 'react';
  import axios from 'axios';
  import styles from './JournalHistoryStyle';
  
  //props: username, prompt, text, timestamp
  export default function JournalCard(props) {

    return (
      <View style={styles.journalCard}>
        <Text>{props.username}</Text>
        <Text>{props.prompt}</Text>
        <Text>{props.text}</Text>
      </View>
    );
  }
  
JournalCard.propTypes = {
    username: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
  