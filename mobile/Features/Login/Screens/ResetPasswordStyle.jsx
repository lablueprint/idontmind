import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  emailInput: {
    width: '100%',
    height: '18%',
    alignItems: 'center',
    borderRadius: 8,
    // paddingLeft: '7%',
    backgroundColor: 'white',
    color: '#A9B2B2',
    paddingTop: 0,
    paddingBottom: 0,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sendButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: '90%',
  },
  sendButton: {
    width: '65%',
    borderRadius: 99,
    backgroundColor: '#374342',
    paddingVertical: 20,
  },
  sendButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
  },
});
