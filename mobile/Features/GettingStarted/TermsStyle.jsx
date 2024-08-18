import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 100,
  },
  sv: {
    backgroundColor: '#E5F8F3',
    width: '100%',
  },
  back: {
    width: 12,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  chevron: {
    // width: '100%',
    height: 21,
    width: 12,
  },
  title: {
    fontFamily: 'recoleta-regular',
    fontSize: 40,
    color: '#343A3A',
    paddingBottom: 24,
  },
  heading: {
    fontFamily: 'recoleta-regular',
    fontSize: 24,
    color: '#343A3A',
    paddingBottom: 4,
  },
  paragraph: {
    fontFamily: 'cabinet-grotesk-regular',
    fontSize: 16,
    color: '#343A3A',
    lineHeight: 20,
    paddingBottom: 32,
  },
});
