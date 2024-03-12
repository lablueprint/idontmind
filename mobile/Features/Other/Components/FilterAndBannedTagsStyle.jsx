import { StyleSheet } from 'react-native';

const FilterStyle = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  rowContainer: {
    margin: 8,
    flexDirection: 'row',
  },

  tagContainer: {
    width: 200,
  },

  text: {
    fontSize: 15,
  },

  checkbox: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },

  buttons: {
    height: 40,
    width: 175,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default FilterStyle;
