import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  prompt: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBox: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'flex-start',
    borderWidth: 2,
    width: '80%',
   height: '80%',
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
    padding: 10,
  },

  modalSelections: {
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
  },

  modalBox: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#C1C1C1',
  },
  imageContainer: {
    height: '10%',
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
});
