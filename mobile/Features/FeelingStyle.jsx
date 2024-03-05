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
  down: {
    width: 50,
    height: 50,
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