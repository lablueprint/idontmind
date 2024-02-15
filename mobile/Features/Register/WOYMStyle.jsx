import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  pills: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  down: {
    width: 50,
    height: 50,
  },
  showIt: {
    display: 'flex',
  },
  dontShowIt: {
    display: 'none',
  },
  pill: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  selectedPill: {
    backgroundColor: 'green',
  },
  nonselectedPill: {
    backgroundColor: 'red',
  },
});