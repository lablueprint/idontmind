import React, { useState } from 'react';
import {
  View, Text, Modal, Image, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../ContentLibrary/Components/FolderModalStyle';
import exit from '../../assets/images/exit.png';


function CheckInModal({
  checkInQNum, modalVisible, toggleModal
}) {
    const whatWeAsking = [
         "Think of this like those smiley and frowny faces at the doctor's office, but for your mood. It's a simple way to check in with yourself. Are you feeling up, down, or somewhere in-between today? It's all about getting a quick snapshot of your emotional weather report.",
         "Here, we're trying to get a sense of how restful your sleep was last night. Think about how you felt when you woke up – refreshed and ready to roll, or like you were wrestling with your pillows all night.",
         "This one's like a fuel gauge for your body and mind. Are you running on a full tank today, or are you in the red zone? Slide that scale to match how you're feeling."
    ]
    const whatItMeans = [
        "This isn't just about putting a number to your feelings. It's more about noticing how you're doing on a day-to-day basis. Tracking your mood helps you see patterns over time – like what makes you feel great, or what brings you down. It's like being your own mood detective!",
        "Good sleep is like the unsung hero of mental health. It can affect everything from your mood to your energy levels. By keeping tabs on your sleep quality, you can start to figure out what helps you catch those quality Zs and what doesn't. It's all about building your personal sleep success strategy.",
        "Your energy level is a big clue to your overall well-being. It's tied to stuff like sleep, nutrition, stress, and even how much you're moving around. By tracking this, you can start connecting the dots between what you do and how energized you feel.",
   ]
  return (
    <Modal
    visible={modalVisible}
    transparent
    animationType="fade"
    onRequestClose={toggleModal}
  >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ alignItems: 'flex-end' }}>
            <Pressable onPress={toggleModal}>
              <Image style={{ width: 20, height: 20 }} source={exit} />
            </Pressable>
          </View>
          <View>
            <Text style={{ fontFamily: 'cabinet-grotesk-bold', fontSize: 18}}>What we're really asking</Text>
            <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18, marginBottom: 10}}>{whatWeAsking[checkInQNum]}</Text>
            <Text style={{ fontFamily: 'cabinet-grotesk-bold', fontSize: 18 }}>What It Means</Text>
            <Text style={{ fontFamily: 'cabinet-grotesk-regular', fontSize: 18, marginBottom: 10 }}>{whatItMeans[checkInQNum]}</Text>
          </View>
        </View>
      </View>
  </Modal>
  );
}
export default CheckInModal;

CheckInModal.propTypes = {
    checkInQNm: PropTypes.number.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };
