import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Cabinet Grotesk',
  },
  challengeContainer: {
    marginVertical: 5,
  },
  continue: {
    backgroundColor: '#374342',
    padding: 10,
    borderRadius: 99,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    marginTop: '10%',
  },
  contText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  unfoldedContainer: {
    height: 289,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  foldedContainer: {
    height: 76,
  },
  cardHeader: {
    fontWeight: 400,
    fontSize: 22,
    textAlign: 'center',
    marginTop: '10%',
    width: '85%',
  },
  cardDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: '6%',
    width: '80%',
  },
  completedImage: {
    width: 50,
    height: 50,
    marginBottom: '8%',
  },
  completedOnText: {
    color: '#708684',
    fontSize: 14,
    fontWeight: 700,
    marginBottom: '5%',
    marginTop: '2%',
  },
  foldedFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2E4E3',
    height: 76,
    borderRadius: 8,
  },
  contains: {
    display: 'flex',
    flexDirection: 'column',
    height: '80%',
    justifyContent: 'center',
  },
  calendar: {
    width: 21,
    height: 24,
    marginLeft: '6%',
    marginRight: '6%',
  },
});
