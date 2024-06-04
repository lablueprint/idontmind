import { useEffect, useState } from 'react';
import {
  Text, View, Pressable, Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import chev from '../../assets/images/chevron-up.png';
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
  const [selectedIdentity, setSelectedIdentity] = useState({
    Identity: false,
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
  const [selectedLifestyle, setSelectedLifestyle] = useState({
    Lifestyle: false,
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
  const [selectedMental, setSelectedMental] = useState({
    Mental: false,
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
  const [outOf3, setOutOf3] = useState(0);

  const [showCoping, setShowCoping] = useState(false);
  const [showEWB, setShowEWB] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  const [showLifestyle, setShowLifestyle] = useState(false);
  const [showMental, setShowMental] = useState(false);

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

  const toggleIdentity = (term) => {
    const temp = { ...selectedIdentity };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedIdentity(temp);
  };

  const toggleLifestyle = (term) => {
    const temp = { ...selectedLifestyle };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedLifestyle(temp);
  };

  const toggleMental = (term) => {
    const temp = { ...selectedMental };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedMental(temp);
  };

  useEffect(() => {
    const copingCount = Object.values(selectedCoping).filter((value) => value).length;
    const ewbCount = Object.values(selectedEWB).filter((value) => value).length;
    const iCount = Object.values(selectedIdentity).filter((value) => value).length;
    const sCount = Object.values(selectedLifestyle).filter((value) => value).length;
    const mCount = Object.values(selectedMental).filter((value) => value).length;
    const totalCount = copingCount + ewbCount + iCount + sCount + mCount;
    setOutOf3(totalCount);
    if (totalCount > 3) {
      setOutOf3(3);
    }
  }, [selectedCoping, selectedEWB, selectedLifestyle, selectedIdentity, selectedMental]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.sv, styles.overlay]}>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>
              What&apos;s on your mind?
            </Text>
          </View>
          <View>
            <Text style={styles.subheading}>
              Select at least three tags you&apos;re interested in receiving curated content for.
              You can always change this later.
            </Text>
          </View>
          <View style={styles.pillArea}>
            <View style={[styles.titleButton,
              showCoping ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable style={styles.arrow} onPress={() => setShowCoping(!showCoping)}>
                <Text style={styles.pillTitle}>Coping</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showCoping ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showCoping ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedCoping).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleCoping(cope[0])}>
                    <Text
                      style={cope[1] ? styles.selectedPillText : styles.nonselectedPillText}
                    >
                      {cope[0]}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.pillArea}>
            <View style={[styles.titleButton, showEWB ? styles.extraMargin : styles.titleButton]}>
              <Pressable style={styles.arrow} onPress={() => setShowEWB(!showEWB)}>
                <Text style={styles.pillTitle}>Emotional Well-Being</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showEWB ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showEWB ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedEWB).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleEWB(cope[0])}>
                    <Text
                      style={cope[1] ? styles.selectedPillText : styles.nonselectedPillText}
                    >
                      {cope[0]}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.pillArea}>
            <View style={[styles.titleButton,
              showIdentity ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable style={styles.arrow} onPress={() => setShowIdentity(!showIdentity)}>
                <Text style={styles.pillTitle}>Identity and Self-Perception</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showIdentity ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showIdentity ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedIdentity).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleIdentity(cope[0])}>
                    <Text
                      style={cope[1] ? styles.selectedPillText : styles.nonselectedPillText}
                    >
                      {cope[0]}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.pillArea}>
            <View style={[styles.titleButton,
              showLifestyle ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable style={styles.arrow} onPress={() => setShowLifestyle(!showLifestyle)}>
                <Text style={styles.pillTitle}>Lifestyle and Wellness</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showLifestyle ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showLifestyle ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedLifestyle).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleLifestyle(cope[0])}>
                    <Text
                      style={cope[1] ? styles.selectedPillText : styles.nonselectedPillText}
                    >
                      {cope[0]}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.pillArea}>
            <View style={[styles.titleButton,
              showMental ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable style={styles.arrow} onPress={() => setShowMental(!showMental)}>
                <Text style={styles.pillTitle}>Mental Health Conditions</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showMental ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showMental ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedMental).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleMental(cope[0])}>
                    <Text
                      style={cope[1] ? styles.selectedPillText : styles.nonselectedPillText}
                    >
                      {cope[0]}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.stillButt}>
        <View style={styles.nextButtContainer}>
          <Pressable
            style={[styles.nextButt, outOf3 > 2 ? styles.nextNot : styles.nextReady]}
          >
            <View style={styles.row}>
              <Text style={[styles.nextText,
                outOf3 > 2 ? styles.nextTextNot : styles.nextTextReady]}
              >
                Next
              </Text>
              <Text style={[styles.nextText,
                outOf3 > 2 ? styles.nextTextNot : styles.nextTextReady,
                outOf3 > 2 ? styles.dontShowIt : styles.showIt]}
              >
                {' '}
                (
                {outOf3}
                /3)
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.fade} />
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
