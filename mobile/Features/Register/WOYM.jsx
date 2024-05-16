import { useEffect, useState } from 'react';
import {
  Text, View, Pressable, Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import chev from '../../assets/images/chevron-up.png';
import data from './PillTags.json';
import styles from './WOYMStyle';

function WOYM({ navigation }) {
  function createMaps(stringsArray) {
    const resultMap = {};
    stringsArray.forEach((str) => {
      resultMap[str] = false;
    });
    return resultMap;
  }

  const [selectedCoping, setSelectedCoping] = useState(createMaps(data.coping));
  const [selectedEWB, setSelectedEWB] = useState(createMaps(data.ewb));
  const [selectedIdentity, setSelectedIdentity] = useState(createMaps(data.identity));
  const [selectedLifestyle, setSelectedLifestyle] = useState(createMaps(data.lifestyle));
  const [selectedMental, setSelectedMental] = useState(createMaps(data.mental));
  const [selectedRelationships,
    setSelectedRelationships] = useState(createMaps(data.relationships));
  const [selectedSelf, setSelectedSelf] = useState(createMaps(data.self));
  const [selectedSupport, setSelectedSupport] = useState(createMaps(data.support));
  const [selectedTrauma, setSelectedTrauma] = useState(createMaps(data.trauma));

  const [outOf3, setOutOf3] = useState(0);

  const [showCoping, setShowCoping] = useState(false);
  const [showEWB, setShowEWB] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  const [showLifestyle, setShowLifestyle] = useState(false);
  const [showMental, setShowMental] = useState(false);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showSelf, setShowSelf] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showTrauma, setShowTrauma] = useState(false);

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

  const toggleRelationships = (term) => {
    const temp = { ...selectedRelationships };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedRelationships(temp);
  };

  const toggleSelf = (term) => {
    const temp = { ...selectedSelf };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedSelf(temp);
  };

  const toggleSupport = (term) => {
    const temp = { ...selectedSupport };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedSupport(temp);
  };

  const toggleTrauma = (term) => {
    const temp = { ...selectedTrauma };
    if (temp[term] === false) {
      temp[term] = true;
    } else if (temp[term] === true) {
      temp[term] = false;
    }
    setSelectedTrauma(temp);
  };

  useEffect(() => {
    const copingCount = Object.values(selectedCoping).filter((value) => value).length;
    const ewbCount = Object.values(selectedEWB).filter((value) => value).length;
    const iCount = Object.values(selectedIdentity).filter((value) => value).length;
    const sCount = Object.values(selectedLifestyle).filter((value) => value).length;
    const mCount = Object.values(selectedMental).filter((value) => value).length;
    const rCount = Object.values(selectedRelationships).filter((value) => value).length;
    const ssCount = Object.values(selectedSelf).filter((value) => value).length;
    const sssCount = Object.values(selectedSupport).filter((value) => value).length;
    const tCount = Object.values(selectedTrauma).filter((value) => value).length;
    const totalCount = copingCount + ewbCount + iCount + sCount + mCount
    + rCount + ssCount + sssCount + tCount;
    setOutOf3(totalCount);
    if (totalCount > 3) {
      setOutOf3(3);
    }
  }, [selectedCoping, selectedEWB, selectedLifestyle, selectedIdentity, selectedMental,
    selectedRelationships, selectedSelf, selectedSupport, selectedTrauma,
  ]);

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
            <View
              style={[styles.titleButton, showCoping ? styles.extraMargin : styles.titleButton]}
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
          <View style={styles.pillArea}>
            <View
              style={[styles.titleButton, showRelationships
                ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable
                style={styles.arrow}
                onPress={() => setShowRelationships(!showRelationships)}
              >
                <Text style={styles.pillTitle}>Relationships</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showRelationships ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showRelationships ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedRelationships).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleRelationships(cope[0])}>
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
            <View
              style={[styles.titleButton, showSelf ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable style={styles.arrow} onPress={() => setShowSelf(!showSelf)}>
                <Text style={styles.pillTitle}>Self-Improvement and Growth</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showSelf ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showSelf ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedSelf).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleSelf(cope[0])}>
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
            <View
              style={[styles.titleButton, showSupport ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable style={styles.arrow} onPress={() => setShowSupport(!showSupport)}>
                <Text style={styles.pillTitle}>Support</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showSupport ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showSupport ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedSupport).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleSupport(cope[0])}>
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
            <View
              style={[styles.titleButton, showTrauma ? styles.extraMargin : styles.titleButton]}
            >
              <Pressable style={styles.arrow} onPress={() => setShowTrauma(!showTrauma)}>
                <Text style={styles.pillTitle}>Trauma and Recovery</Text>
                <View style={styles.arrowCont}>
                  <Image
                    source={chev}
                    style={[styles.down, showTrauma ? styles.down : styles.rotated]}
                  />
                </View>
              </Pressable>
            </View>
            <View style={[styles.pills, showTrauma ? styles.showIt : styles.dontShowIt]}>
              {Object.entries(selectedTrauma).map((cope) => (
                <View
                  key={cope[0]}
                  style={[styles.pill, cope[1] ? styles.selectedPill : styles.nonselectedPill]}
                >
                  <Pressable onPress={() => toggleTrauma(cope[0])}>
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
