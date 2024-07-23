import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: '25%',
    marginTop: '40%',
  },
  continueButton: {
    width: '65%',
    height: '60.5%',
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
    height: 60,
    width: 60,
  },
  bottomButtonsContainer: {
    height: 100,
    width: '100%',
    marginBottom: '15%',
    alignItems: 'center',
  },
});
