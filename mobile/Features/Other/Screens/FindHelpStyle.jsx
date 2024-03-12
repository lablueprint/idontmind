import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
    height: '100%',
    width: '100%',
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
  resourceTitle: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 8,
  },
  resourceBodyBack: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 8,
  },
  resourceBodyFront: {
    fontSize: 40,
    textAlign: 'center',
  },
  firstCard: {
    borderColor: 'black',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 300,
    borderRadius: 16,
    marginVertical: 20,
  },

  secondCard: {
    borderColor: 'black',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 300,
    borderRadius: 16,
  },
  // front: {
  //   borderColor: 'green',
  //   borderWidth: 2,
  // },
});
