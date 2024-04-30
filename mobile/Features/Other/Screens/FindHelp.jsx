import React from 'react';
import {
  ScrollView, Text, View, Button, Linking,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import styles from './FindHelpStyle';

export default function FindHelp() {
  const callSuicideCrisisLifeline = () => {
    const phoneNumber = '988';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const textCrisisCounselor = () => {
    const phoneNumber = '741741';
    const message = 'IDM';
    Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>find help</Text>
        <View style={styles.firstCard}>
          <FlipCard>
            <View style={styles.front}>
              <Text style={styles.resourceTitle}>988 SUICIDE & CRISIS LIFELINE</Text>
              <Text style={styles.resourceBodyFront}>DIAL 988</Text>
            </View>
            <View style={styles.back}>
              <Text style={styles.resourceTitle}>988 SUICIDE & CRISIS LIFELINE</Text>
              <Text style={styles.resourceBodyBack}>
                If you or someone you know is in crisis, whether they are considering suicide or
                not, please call the Lifeline to speak with a trained Crisis Counselor 24/7.
                988lifeline.org.
              </Text>
              <Button style={styles.resourceBodyButton} onPress={callSuicideCrisisLifeline} title="DIAL 988" />
            </View>
          </FlipCard>
        </View>

        <View style={styles.secondCard}>
          <FlipCard>
            <View style={styles.front}>
              <Text style={styles.resourceTitle}>CRISIS TEXT LINE</Text>
              <Text style={styles.resourceBodyFront}>TEXT IDM to 741741</Text>
            </View>
            <View style={styles.back}>
              <Text style={styles.resourceTitle}>CRISIS TEXT LINE</Text>
              <Text style={styles.resourceBodyBack}>
                Connect with a trained Crisis Counselor to receive free, 24/7 crisis support via text message. crisistextline.org.
              </Text>
              <Button style={styles.resourceBodyButton} onPress={textCrisisCounselor} title="TEXT 741741" />
            </View>
          </FlipCard>
        </View>
      </View>
    </ScrollView>
  );
}
