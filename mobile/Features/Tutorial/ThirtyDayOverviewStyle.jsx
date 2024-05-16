import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontFamily: 'recoleta-regular',
    fontSize: 40,
    color: '#343A3A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'cabinet-grotesk-regular',
    lineHeight: 24,
    fontSize: 16,
    color: '#343A3A',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pic: {
    width: 240,
    height: 245,
    alignSelf: 'center',
    marginBottom: 23,
  },
  continue: {
    backgroundColor: '#546967',
    alignItems: 'center',
    borderRadius: 99,
    marginBottom: 12,
    marginTop: 34,
    marginHorizontal: 39,
  },
  contText: {
    marginVertical: 20,
    fontFamily: 'cabinet-grotesk-bold',
    fontSize: 18,
    color: '#F6FCFC',
  },
});
