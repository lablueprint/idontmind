import { useState } from 'react';
import {
  Text, View, Pressable, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import shape from '../../assets/images/shape.png';
import styles from './WOYMStyle';

function WOYM({ navigation }) {
  const [selectedCoping, setSelectedCoping] = useState({
    Breathing: false,
    'Coping Strategies': false,
    Gratitude: false,
    Grounding: false,
    'Self Care': false,
  });
  const [selectedEWB, setSelectedEWB] = useState({
    Anger: false,
    Burnout: false,
    Crying: false,
    Emotions: false,
    Fear: false,
    Feelings: false,
    Grief: false,
    Loneliness: false,
    Mindfulness: false,
    Mood: false,
    'Positive Thinking': false,
    Stress: false,
  });

  const [showCoping, setShowCoping] = useState(false);
  const [showEWB, setShowEWB] = useState(false);

  const toggleCoping = (term) => {
    const temp = { ...selectedCoping };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedCoping(temp);
  };

  const toggleEWB = (term) => {
    const temp = { ...selectedEWB };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedEWB(temp);
  };

  const displayCoping = () => {
    if (showCoping === false) {
      setShowCoping(true);
    } else if (showCoping === true) {
      setShowCoping(false);
    }
  };

  const displayEWB = () => {
    if (showEWB === false) {
      setShowEWB(true);
    } else if (showEWB === true) {
      setShowEWB(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>
          What&apos;s on your mind?
        </Text>
      </View>
      <View style={styles.heading}>
        <View style={styles.titleButton}>
          <Text>Coping</Text>
          <Pressable style={styles.arrow} onPress={displayCoping}>
            <Image source={shape} style={styles.down} />
          </Pressable>
        </View>
        <View style={[styles.pills, showCoping ? styles.showIt : styles.dontShowIt]}>
          {Object.entries(selectedCoping).map((cope) => (
            <View
              key={cope[0]}
              style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
            >
              <Pressable onPress={() => toggleCoping(cope[0])}>
                <Text>{cope[0]}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.heading}>
        <View style={styles.titleButton}>
          <Text>Emotional Well-Being</Text>
          <Pressable style={styles.arrow} onPress={displayEWB}>
            <Image source={shape} style={styles.down} />
          </Pressable>
        </View>
        <View style={[styles.pills, showEWB ? styles.showIt : styles.dontShowIt]}>
          {Object.entries(selectedEWB).map((cope) => (
            <View
              key={cope[0]}
              style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
            >
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

// navigation is currently not used
// but will be used when integrated with other files in the register pipeline
WOYM.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
