import {
  ScrollView, Text, View, Button, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JournalCard from '../../Journal/Components/JournalCard';

export default function JournalHistoryPage({ navigation }) {
  const [journals, setJournals] = useState([]); // array of journal entries
  const [img, setImg] = useState(null);

  const getPastJournals = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`);
    setJournals(res.data);
  }; // fetch all the journal entries and set the journals array accordingly

  const retrieveImg = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/test/getImage`);
    setImg(res.data);
  };
  useEffect(() => {
    getPastJournals();
    retrieveImg();
  }, []); /* this is kinda confusing, i think i might
  have to reload the app for the journal i just submitted
to show up in 'recent entries' */

  const navigateToPastJournal = (text) => {
    navigation.navigate('Journal', { body: text, isHistory: true });
  }; /* navigate to the past journal entry, isHistory
   is set to true (uneditable text box with the corresponding prompt) */

  const navigateToJournal = () => {
    navigation.navigate('Journal', { isHistory: false });
  }; /* navigate to today's journal prompt, isHistory is set to true
   (editable text box with today's prompt) */

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 0.5 }}>
        <Text style={{ fontSize: 18 }}>recent entries</Text>
        <View>
          <Image source={{ uri: img }} style={{ width: 200, height: 200 }} />
        </View>
        <ScrollView>
          {journals.map((x) => (
            <JournalCard
              key={x._id}
              username={x.username}
              date={x.timestamp}
              prompt={x.prompt}
              text={x.text}
              onPress={navigateToPastJournal}

            />
          ))}
        </ScrollView>
      </View>
      <Button
        title="To Today's Journal"
        onPress={navigateToJournal}
      />
    </View>
  );
}

JournalHistoryPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
