import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    top: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rating: {
    flex: 1,
    backgroundColor: 'red',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  singularRating: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '10%',
    marginBottom: '10%',
    textAlign: 'left',

  },
  slider: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: 'yellow',
    height: '100%',
  },
  faces: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    flexDirection: 'column',
    // transform: [{scale: 0.7}],
    justifyContent: 'center',
  },
  singularFace: {
    flex: 1,
    // margin: '5px',
    transform: [{ scale: 0.5 }],
    alignItems: 'center',
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
    bottom: '2.5%',
  },
});
