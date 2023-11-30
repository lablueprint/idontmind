import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '90%',
      height: '80%',
      justifyContent: 'flex-start',
      borderWidth: 1,
      borderColor: '#ccc', 

    },
    prompt: {
      fontSize: 26,
      fontWeight: 'bold', 
    },
    textBox: {
      padding: 10,
      marginTop: 20,
      justifyContent: 'flex-start',
      // position: 'fixed',
      borderWidth: 2,
      minWidth: '90%',
      height: 500,
    },
  });