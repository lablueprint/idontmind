import {
   ScrollView, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback,
  } from 'react-native';
  import PropTypes from 'prop-types';
import styles from "./JournalStyle"

  
  export default function Journal() {
    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>Create a journal post!</Text>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.textBox}>
            <TextInput
              multiline={true}
              placeholder="Type your response"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
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
  