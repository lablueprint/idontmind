import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  outer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#CDEDE5',
  },
  container: {
    height: '100%',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: '60%',
    resizeMode: 'contain',
  },
  underLogo: {
    textAlign: 'center',
    marginBottom: 100,
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
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsNext: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  buttonWord: {
    alignContent: 'flex-end',
    textDecorationLine: 'underline',
    color: '#676C6C',
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 14,
  },
  getStarted: {
    marginTop: 21,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'pink',
    marginBottom: 10,
  },
  signIn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
});
