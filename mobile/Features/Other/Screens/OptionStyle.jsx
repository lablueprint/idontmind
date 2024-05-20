import { StyleSheet } from 'react-native';

const OptionStyle = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 30,
    height: '130%',
  },

  imageContainer: {
    height: 50,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },

  video: {
    width: 200,
    height: 200,
  },

  title: {
    fontSize: 36,
  },

  text: {
    fontSize: 20,
    width: 400,
  },

  arrow: {
    fontSize: 20,
    marginLeft: '40%',
  },

  box: {
    width: 20,
    height: 20,
    backgroundColor: '#D9D9D9',
    marginRight: 20,
    marginTop: 8,
  },

  optionContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },

  rowContainer: {
    flexDirection: 'row',
  },

  personalData: {
    fontSize: 20,
    color: '#00000080',
  },

  customize: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#00000080',
  },

});

export default OptionStyle;
