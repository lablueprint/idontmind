import {
    StyleSheet, Text, View, Button,
  } from 'react-native';
  import PropTypes from 'prop-types';
  
  const styles = StyleSheet.create({
    container: {
      width: 1000,
      borderWidth: 1,
      borderColor: '#ccc', 
    },
    prompt: {
      fontSize: 32,
      fontWeight: 'bold', 
    },
  });
  
  export default function Journal() {
  
    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>Create a journal post!</Text>
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
  