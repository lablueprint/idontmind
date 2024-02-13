import { useState, useEffect } from 'react';
import {
  Text, View, TextInput, StyleSheet, Pressable, Image,
} from 'react-native';
import styles from './WOYMStyle';

function WOYM({ navigation }) {

  const [selectedCoping, setSelectedCoping] = useState({
    'Breathing': false, 
    'Coping Strategies': false, 
    'Gratitude': false, 
    'Grounding': false, 
    'Self Care': false,
  });
  const [selectedEWB, setSelectedEWB] = useState({
    'Anger': false, 
    'Burnout': false, 
    'Crying': false, 
    'Emotions': false, 
    'Fear': false,
    'Feelings': false, 
    'Grief': false, 
    'Loneliness': false, 
    'Mindfulness': false, 
    'Mood': false,
    'Positive Thinking': false, 
    'Stress': false,
  });

  const [showCoping, setShowCoping] = useState(false);
  const [showEWB, setShowEWB] = useState(false);

  const toggleCoping = (term) => {
    let temp = {...selectedCoping};
    if (temp[term] === false) {
      temp[term] = true;
    }
    else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedCoping(temp);
  };

  const toggleEWB = (term) => {
    let temp = {...selectedEWB};
    console.log(temp[term]);
    if (temp[term] === false) {
      temp[term] = true;
    }
    else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedEWB(temp);
  };

  useEffect(() => {
    console.log(Object.entries(selectedEWB))
  }, [selectedEWB]);
  
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>
          What's on your mind?
        </Text>
      </View>
      <View style={styles.heading}>
        <View>
          <Text>Coping</Text>
          <Pressable style={styles.arrow} onPress={() => setShowCoping(!showCoping)} />
        </View>
        <View style={[styles.pills, showCoping ? styles.showIt : styles.dontShowIt]}>
        {Object.entries(selectedCoping).map((cope) => (
            <View key={cope[0]} style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}>
              <Pressable onPress={() => toggleCoping(cope[0])}>
                <Text>{cope[0]}</Text>
              </Pressable>
            </View>
        ))}
        </View>
      </View>
      <View style={styles.heading}>
        <Text>
          Emotional Well-Being
        </Text>
        <View style={styles.pills}>
        {Object.entries(selectedEWB).map((cope) => (
            <View key={cope[0]} style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}>
              <Pressable onPress={() => toggleEWB(cope[0])}>
                <Text>{cope[0]}</Text>
              </Pressable>
            </View>
        ))}
        </View>
      </View>
    </View>
  );
}

export default WOYM;