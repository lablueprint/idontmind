import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  checkInContentContainer: {
    width: '83%',
  },
  checkInButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // borderWidth: 2,
    // borderColor: 'red',
    height: 150,
  },
  highlight: {
    width: '31%',
    height: '6.8%',
    opacity: 0.75,
    backgroundColor: '#BFDBD7',
    marginTop: '-6.2%',
    zIndex: 0,
  },
  beginCheckInButton: {
    width: '83%',
    backgroundColor: '#374342',
    borderRadius: 40,
    justifyContent: 'center',
    height: '47%',
  },
  continueToDashboardButton: {
    border: 'solid',
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#374342',
    width: '83%',
    justifyContent: 'center',
    height: '47%',
  },
  backArrow: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 40,
    color: '#343A3A',
    zIndex: 1,
  },
  beginCheckInText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 700,
  },
  continueToDashboardText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 700,
    color: '#374342',
  },
  checkInMascot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 284,
    height: 311,
  },
});
