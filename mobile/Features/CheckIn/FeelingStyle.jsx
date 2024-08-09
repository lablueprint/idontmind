import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    width: '90%',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 32,
    color: '#343A3A',
    zIndex: 1,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: '15%',
  },
  pills: {
    marginTop: '4%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    width: '87%',
  },
  down: {
    width: 50,
    height: 50,
  },
  pill: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 7,
    borderRadius: 99,
  },
  selectedPill: {
    backgroundColor: '#374342',
  },
  nonselectedPill: {
    backgroundColor: '#D2E4E3',
  },
  continueButton: {
    width: '65%',
    height: '6.5%',
    backgroundColor: '#374342',
    borderRadius: 40,
    justifyContent: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    width: '90%',
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: 'blue',
  },
  continueText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 700,
  },
  skip: {
    marginTop: '8%',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    resizeMode: 'contain',
  },
  shadowEffect: {
    shadowColor: '#FEE7B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 5,
  },
});
