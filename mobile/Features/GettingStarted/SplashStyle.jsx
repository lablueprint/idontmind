import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center', 
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
  termsPrivacy: {
    textAlign: 'center',
    marginBottom: 30,
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