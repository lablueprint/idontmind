import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    width: '90%',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 32,
    color: '#343A3A',
    zIndex: 1,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: '15%',
  },
  continueButton: {
    width: '65%',
    height: '6.5%',
    backgroundColor: '#374342',
    borderRadius: 40,
    justifyContent: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    width: '90%',
    flexDirection: 'column',
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    resizeMode: 'contain',
  },
  shadowEffect: {
    shadowColor: '#FEE7B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 5,
  },
});
