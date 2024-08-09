import { StyleSheet } from 'react-native';

const OptionStyle = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 30,
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
  buttonShape: {
    backgroundColor: '#C0C0C0',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    width: 258,
    height: 60,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 12,
  },
});

export default OptionStyle;
