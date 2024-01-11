import {
    ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, Modal, TouchableOpacity, Pressable,
  } from 'react-native';
  // import PropTypes from 'prop-types';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import styles from './JournalStyle';
  import JournalCard from './JournalCard';
  
  export default function JournalHistory() {

    const placeholder = [{'username':'nicole','prompt': 'prompt #1', 'text': 'here is my journal post yay!'}, 
    {'username':'alice','prompt': 'prompt #2', 'text': 'here is my second journal post yay!!'}]
 
    const [journals, setJournals] = useState([]); 

    useEffect(() => {
        getPastJournals();
     // setJournals(["hi","hello"])
      
      }, []);

    const getPastJournals = async () => {
      console.log(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`)
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`);
    //   newJournals = [];
    //   for(let i=0; i<res.data.length; i++){
    //     newJournals.push(res.data[i]);
    //   }
    //   setJournals(newJournals);

      setJournals(res.data);
      
    };

    // const getPastJournals = () => {
    //     console.log(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`)
    //     axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/journals/getAllJournals`)
    //         .then((res) => {
    //             console.log("hi")
    //             setJournals(res.data);
    //             console.log(res.data);
    //             console.log(journals)
    //         });
      //   newJournals = [];
      //   for(let i=0; i<res.data.length; i++){
      //     newJournals.push(res.data[i]);
      //   }
      //   setJournals(newJournals);
    //   };

  
    return (
        <View>
            <Text style={{fontSize: 18}}>recent entries</Text>
            {journals.map((x) => (
                <JournalCard username={x.username} prompt={x.prompt} text={x.text}/>
            ))}
        </View>
    );
  }
  
  