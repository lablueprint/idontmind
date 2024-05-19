import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  question: {
    fontFamily: 'recoleta-regular',
    fontSize: 32,
    color: '#4A4E4E',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCol: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonImg: {
    width: 84,
    height: 84,
  },
  buttonText: {
    fontFamily: 'recoleta-regular',
    fontSize: 16, // change later, not sure what this is
  },
  continue: {
    backgroundColor: '#C6CECE',
    alignItems: 'center',
    borderRadius: 99,
    marginBottom: 12,
  },
  contText: {
    marginVertical: 20,
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 18,
    color: '#767C7C',
  },
  skip: {
    alignItems: 'center',
    borderRadius: 99,
  },
  skipText: {
    marginVertical: 20,
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 18,
    color: '#343A3A',
  },
});
