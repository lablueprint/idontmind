import React from 'react';
import {
  ScrollView, Text, View, Button, Linking, Image, TouchableOpacity,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import styles from './FindHelpStyle';
import Phone from '../../../assets/images/phone.png';
import Comment from '../../../assets/images/comment.png';
import FlipIcon from '../../../assets/images/flipicon.png';

export default function FindHelp() {
  const callSuicideCrisisLifeline = () => {
    const phoneNumber = '988';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const textCrisisCounselor = () => {
    const phoneNumber = '741741';
    const message = 'HOME';
    Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  const callNationalDomesticViolenceHotline = () => {
    const phoneNumber = '1-800-799-SAFE';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Find Help</Text>
        <View style={styles.orangeCard}>
          <FlipCard>
            <View style={styles.front}>
              <Text style={styles.resourceTitle}>988 Suicide & Crisis Lifeline</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.redButton} onPress={callSuicideCrisisLifeline}>
                  <Image source={Phone} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>DIAL 988</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
            <View style={styles.back}>
              <Text style={styles.resourceTitle}>988 Suicide & Crisis Lifeline (back)</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.redButton} onPress={callSuicideCrisisLifeline}>
                  <Image source={Phone} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>DIAL 988</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
          </FlipCard>
        </View>

        <View style={styles.yellowCard}>
          <FlipCard>
            <View style={styles.front}>
              <Text style={styles.resourceTitle}>Crisis Text Line</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.yellowButton} onPress={textCrisisCounselor}>
                  <Image source={Comment} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>TEXT IDM TO 741741</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
            <View style={styles.back}>
              <Text style={styles.resourceBody}>Connect with a trained Crisis Counselor to receive free, 24/7 crisis support via text message. crisistextline.org.</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.yellowButton} onPress={textCrisisCounselor}>
                  <Image source={Comment} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>TEXT IDM TO 741741</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
          </FlipCard>
        </View>

        <View style={styles.greenCard}>
          <FlipCard>
            <View style={styles.front}>
              <Text style={styles.resourceTitle}>National Domestic Violence Hotline</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.greenButton} onPress={callNationalDomesticViolenceHotline}>
                  <Image source={Phone} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>DIAL 1-800-799-SAFE</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
            <View style={styles.back}>
              <Text style={styles.resourceTitle}>National Domestic Violence Hotline</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.greenButton} onPress={callNationalDomesticViolenceHotline}>
                  <Image source={Phone} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>DIAL 1-800-799-SAFE</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
          </FlipCard>
        </View>

        <View style={styles.blueCard}>
          <FlipCard>
            <View style={styles.front}>
              <Text style={styles.resourceTitle}>Veteran Crisis Line</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.blueButton} onPress={textCrisisCounselor}>
                  <Image source={Comment} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>TEXT IDM TO 741741</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
            <View style={styles.back}>
              <Text style={styles.resourceTitle}>Veteran Crisis Line</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.blueButton} onPress={textCrisisCounselor}>
                  <Image source={Comment} style={styles.phoneIcon} />
                  <Text style={styles.buttonText}>TEXT IDM TO 741741</Text>
                </TouchableOpacity>
                <Image source={FlipIcon} style={styles.flipIcon} />
              </View>
            </View>
          </FlipCard>
        </View>

      </View>
    </ScrollView>
  );
}
