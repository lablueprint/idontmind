import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    // borderWidth: 2,
    // borderColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: '100%',
    marginTop: '60%',
  },
  heading: {
    fontSize: 32,
    color: '#343A3A',
    zIndex: 1,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: '15%',
  },
  yesButton: {
    width: '100%',
    height: '29%',
    backgroundColor: '#82A5A1',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButton: {
    width: '100%',
    height: '29%',
    backgroundColor: '#82A5A1',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  continueText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 700,
  },
  continueButton: {
    width: '100%',
    height: '26%',
    backgroundColor: '#374342',
    borderRadius: 40,
    justifyContent: 'center',
  },
  skip: {
    marginTop: '8%',
  },
});
