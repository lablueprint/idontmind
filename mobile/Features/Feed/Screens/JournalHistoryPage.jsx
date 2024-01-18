import {
    ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable,
  } from 'react-native';
  // import PropTypes from 'prop-types';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import styles from '../Components/JournalStyle';
  import JournalCard from '../Components/JournalCard';
  

export default function JournalPage({ navigation }) {
    const placeholder = [{'username':'nicole','prompt': 'prompt #1', 'text': 'here is my journal post yay!'}, 
    {'username':'alice','prompt': 'prompt #2', 'text': 'here is my second journal post yay!!'}]

    const [journals, setJournals] = useState([]); 
    useEffect(() => {
        getPastJournals();      
      }, []);

    const getPastJournals = async () => {
      //console.log(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`)
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`);
      setJournals(res.data);
    };
    const navigateToJournal = (text) => {
        console.log(text);
        navigation.navigate('Journal',{body: text, isHistory: true});
    };
    const navigateToLanding = () => {
        navigation.navigate('Landing');
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{flex: .5}}>
            <ScrollView>
                <Text style={{fontSize: 18}}>recent entries</Text>
                {journals.map((x) => (
                    <JournalCard username={x.username} date={x.timestamp} prompt={x.prompt} text={x.text} onPress={navigateToJournal}/>
                ))}
            </ScrollView>
            </View>
            <Button
                title="To Landing"
                onPress={navigateToLanding}
            />
        </View>
    );


}
