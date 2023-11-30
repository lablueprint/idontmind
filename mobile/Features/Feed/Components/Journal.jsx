import {
    StyleSheet, Text, View, Button, TextInput
  } from 'react-native';
  import PropTypes from 'prop-types';
import styles from "./JournalStyle"

  
  export default function Journal() {
    return (
      <>
      <View style={styles.container}>
        <Text style={styles.prompt}>Create a journal post!</Text>
      
        <TextInput
            placeholder = "Type your response"
        />
      </View>
      
      </>
      
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
  