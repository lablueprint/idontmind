import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  checkInContentContainer: {
    width: '83%',
  },
  checkInButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '10%',
    // borderWidth: 2,
    // borderColor: 'red',
    height: 65,
  },
  beginCheckInButton: {
    width: '75%',
    backgroundColor: '#374342',
    borderRadius: 12,
    justifyContent: 'center',
  },
  backButton: {
    width: 64,
    height: 64,
    border: 'solid',
    borderWidth: 3,
    borderRadius: 12,
    borderColor: '#374342',
    justifyContent: 'center',
  },
  backArrow: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 40,
    color: '#343A3A',
  },
  beginCheckInText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 700,
  },
  checkInMascot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 284,
    height: 311,
  },
});
