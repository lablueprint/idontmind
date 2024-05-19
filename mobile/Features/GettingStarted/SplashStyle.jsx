import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  },
  termsText: {
    textAlign: 'center',
  },
  termsPrivacy: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsNext: {
    marginBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  buttonWords: {
    alignContent: 'flex-end',
    textDecorationLine: 'underline',
  },
  getStarted: {
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
