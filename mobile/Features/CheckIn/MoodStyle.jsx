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
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    margin: 0,
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
    bottom: '2%',
  },
  moodRow: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singularMood: {
    flexDirection: 'column',
    alignItems: 'center',
    // transform: [{ scale: 0.8 }],
    flex: 1,
  },
  icon: {
    width: 100,
    height: 100,
  },
  addedMood: {
    flexDirection: 'column',
    alignItems: 'center',
    transform: [{ scale: 0.8 }],
  },
  headingText: {
    fontSize: 32,
    color: '#4A4E4E',
    fontFamily: 'recoleta-regular',
  },
  activityText: {
    fontSize: 16,
    color: '#4A4E4E',
    fontFamily: 'cabinet-grotesk-bold',
  },
});
