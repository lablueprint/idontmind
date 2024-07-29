import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#E5F8F3',
  },
  topHeading: {
    fontSize: 32,
    color: '#343A3A',
    zIndex: 1,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: '0%',
    marginTop: '25%',
  },
  content: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    flex: 1,
    height: '85%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  singularRating: {
    flex: 1,
    justifyContent: 'center',
  },
  singularRating2: {
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 28,
    marginLeft: '25%',
    width: '90%',
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  faces: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '85%',
  },
  singularFace: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: '100%',
    overflow: 'visible',
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
    width: '100%',
    height: '100%',
    marginTop: '8%',
  },
  continueButton: {
    width: '65%',
    height: '50%',
    backgroundColor: '#374342',
    borderRadius: 40,
    justifyContent: 'center',
  },
  continueText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 700,
  },
  skip: {
    marginTop: '8%',
  },
});
