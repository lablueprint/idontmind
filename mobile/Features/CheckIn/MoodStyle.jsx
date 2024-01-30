import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',

  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodRow: {
    flexDirection: "row"
  },
  plusButton:{
  }
});
