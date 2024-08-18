import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  outer: {
    height: '100%',
    width: '100%',
    // backgroundColor: '#CDEDE5',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  lilguy: {
    position: 'absolute',
    zIndex: -1,
    top: 70,
    width: 450,
    height: 450,
  },
  logo: {
    width: '70%',
    resizeMode: 'contain',
    zIndex: 9999,
    marginTop: 300,
  },
  underLogo: {
    textAlign: 'center',
    marginBottom: 147,
    fontFamily: 'cabinet-grotesk-bold',
    color: '#708684',
    fontSize: 18,
  },
  termsText: {
    textAlign: 'center',
    color: '#676C6C',
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 14,
  },
  termsPrivacy: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  break: {
    height: 21,
  },
  termsNext: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWord: {
    alignContent: 'flex-end',
    textDecorationLine: 'underline',
    color: '#676C6C',
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 14,
  },
  buttonGradient: {
    alignSelf: 'center',
    width: 272,
    borderRadius: 99,
    overflow: 'hidden', // Clip the children to the border radius
  },
  getStarted: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: 272,
    borderRadius: 99,
  },
  gsText: {
    color: '#F6FCFC',
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 18,
    marginVertical: 7,
  },
  signIn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  siText: {
    color: '#343A3A',
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 18,
  },
});
