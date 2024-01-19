import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
  },
  row: {
    marginTop: 16,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  resourceFullBlue: {
    backgroundColor: '#D6E5FF',
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resourceHalfRed: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#F6CAC9',
    flex: 1,
  },
  resourceHalfYellow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#FFF0D6',
    flex: 1,
  },
  resourceTitle: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 8,
  },
  resourceBold: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  resourceBody: {
    fontSize: 16,
  },
});
