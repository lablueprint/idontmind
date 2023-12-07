import {
   ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, Modal, TouchableOpacity, KeyboardAvoidingView
  } from 'react-native';
  import PropTypes from 'prop-types';
import styles from "./JournalStyle"
import React, { useState } from 'react';

  
export default function Journal() {
const [text, setText] = useState('')
const [confirmPopUp, setConfirmPopUp] = useState(false)
const handlePopUp = () => {
    setConfirmPopUp(!confirmPopUp)
}

const handleSubmit = () => {
    console.log(text)
}

return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.container}>
                <Text style={styles.prompt}>Create a journal post!</Text>
                <View style={styles.textBox}>
                    <ScrollView automaticallyAdjustKeyboardInsets={true}>
                        <TextInput
                            multiline={true}
                            placeholder="Type your response"
                            onChangeText={setText}
                            value={text}
                        />
                        <View style={{ height: 40 }} />
                    </ScrollView>
                </View>
                <Button title="Submit" onPress = {handlePopUp}></Button>
                <Modal visible={confirmPopUp} transparent={true}>
                    <TouchableOpacity onPressOut ={handlePopUp} style={styles.modalView}>
                        <View style={styles.modal}>
                            <Text>Confirm Submission?</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Button title='Yes' onPress={handleSubmit}></Button>
                                <Button title='No' onPress={handlePopUp}></Button>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            
            </View>
            
        </View>
    </TouchableWithoutFeedback>
);
}
  
//   Post.propTypes = {
//     username: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//     timestamp: PropTypes.string.isRequired,
//     navigation: PropTypes.shape({
//       navigate: PropTypes.func,
//     }).isRequired,
//   };
  