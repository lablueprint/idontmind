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
    width: '48%',
    borderRadius: 99,
    backgroundColor: '#C8C8C8',
    paddingVertical: 14,
  },
  sendButtonText: {
    alignSelf: 'center',
    color: '#7A7A7A',
    fontSize: 14,
    fontWeight: 600,
  },
});
