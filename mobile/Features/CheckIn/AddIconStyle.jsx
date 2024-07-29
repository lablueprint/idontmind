import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    top: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  content: {
    flex: 4,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  heading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  singularColor: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center',
  },
  iconPhoto: {
    width: 100,
    height: 100,
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottomMargin: 10,
  },
});
