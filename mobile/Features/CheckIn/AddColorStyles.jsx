import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
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
    marginLeft: '5%',
    marginRight: '5%',
    margin: 0,
  },
  heading: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  colorRow: {
    flexDirection: "row"
  },
  singularColor: {
    flexDirection: 'column',
    padding: 10,
    alignItems:'center',
    transform: [{scale: 0.6}],
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottomMargin: 10,
  },
});
