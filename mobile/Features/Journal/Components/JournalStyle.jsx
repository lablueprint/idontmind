import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '90%',
    height: '90%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  prompt: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBox: {
    padding: 10,
    marginTop: 20,
    justifyContent: 'flex-start',
    borderWidth: 2,
    minWidth: '90%',
    height: 350,
  },
  attachmentBox: {
    padding: 10,
    marginTop: 20,
    justifyContent: 'flex-start',
    borderWidth: 2,
    minWidth: '90%',
    height: 100,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  modal: {
    height: 100,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#ccc',
    borderWidth: 1,
    width: 200,
    padding: 10,
  },
  rectangle: {
    width: 200,
    height: 150,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
