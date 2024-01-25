import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rating: {
    flex: 1,
    backgroundColor: 'red',
    height: '100%',
    justifyContent:'center',
  },
  slider: {
    flex: 1,
    justifyContent:'center',

    backgroundColor: 'yellow',
    height: '100%',
  },
  faces: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    flexDirection: 'column',
    // transform: [{scale: 0.7}],
    justifyContent:'center',
  },
  singularFace: {
    flex: 1,
    // margin: '5px',
    transform: [{scale: 0.5}],
    alignItems: 'center', 
    justifyContent: 'center',
  },
});
