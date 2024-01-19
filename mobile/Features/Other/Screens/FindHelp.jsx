import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './FindHelpStyle';

export default function FindHelp() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>find help</Text>
        <View style={styles.row}>
          <View style={styles.resourceFullBlue}>
            <Text style={styles.resourceTitle}>
              988 SUICIDE & CRISIS LIFELINE
            </Text>
            <Text style={styles.resourceBold}>
              988
            </Text>
            <Text style={styles.resourceBody}>
              If you or someone you know is in crisis, whether they are
              considering suicide or not, please call the Lifeline to speak with
              a trained Crisis Counselor 24/7. 988lifeline.org
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.resourceHalfRed}>
            <Text style={styles.resourceTitle}>
              CRISIS TEXT LINE
            </Text>
            <Text style={styles.resourceBold}>
              Text IDM to 741741
            </Text>
            <Text style={styles.resourceBody}>
              Connect with a trained Crisis Counselor to receive free, 24/7
              crisis support via text message. crisistextline.org
            </Text>
          </View>

          <View style={styles.resourceHalfYellow}>
            <Text style={styles.resourceTitle}>
              WARMLINES
            </Text>
            <Text style={styles.resourceBold}>
              Warmlines List
            </Text>
            <Text style={styles.resourceBody}>
              A warmline is a listening line run by people in recovery
              themselves. If you just need someone to talk to, warmlines can
              provide early intervention and emotional support.
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.resourceFullBlue}>
            <Text style={styles.resourceTitle}>
              988 SUICIDE & CRISIS LIFELINE
            </Text>
            <Text style={styles.resourceBold}>
              988
            </Text>
            <Text style={styles.resourceBody}>
              If you or someone you know is in crisis, whether they are
              considering suicide or not, please call the Lifeline to speak with
              a trained Crisis Counselor 24/7. 988lifeline.org
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.resourceHalfRed}>
            <Text style={styles.resourceTitle}>
              CRISIS TEXT LINE
            </Text>
            <Text style={styles.resourceBold}>
              Text IDM to 741741
            </Text>
            <Text style={styles.resourceBody}>
              Connect with a trained Crisis Counselor to receive free, 24/7
              crisis support via text message. crisistextline.org
            </Text>
          </View>

          <View style={styles.resourceHalfYellow}>
            <Text style={styles.resourceTitle}>
              WARMLINES
            </Text>
            <Text style={styles.resourceBold}>
              Warmlines List
            </Text>
            <Text style={styles.resourceBody}>
              A warmline is a listening line run by people in recovery
              themselves. If you just need someone to talk to, warmlines can
              provide early intervention and emotional support.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
